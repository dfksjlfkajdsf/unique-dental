import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../lib/api';
import Spinner from '../../components/ui/Spinner';
import toast from 'react-hot-toast';
import { Upload, Trash2, Edit3, ImagePlus, X, Images, Cloud, Search, Check, ZoomIn } from 'lucide-react';

const CATS = [
  'Our Branches',
  'Our Clinic',
  'Our Team',
  'Dental Camps',
  'Treatments',
  'Happy Patients',
];

const CAT_BADGES = {
  'Our Branches':   'bg-sky-50 text-sky-700 border-sky-200',
  'Branches':       'bg-sky-50 text-sky-700 border-sky-200',
  'Our Clinic':     'bg-teal-50 text-teal-700 border-teal-200',
  'Clinic':         'bg-teal-50 text-teal-700 border-teal-200',
  'Our Team':       'bg-purple-50 text-purple-700 border-purple-200',
  'Team':           'bg-purple-50 text-purple-700 border-purple-200',
  'Dental Camps':   'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Camps':          'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Treatments':     'bg-rose-50 text-rose-700 border-rose-200',
  'Happy Patients': 'bg-amber-50 text-amber-700 border-amber-200',
  'Smiles':         'bg-amber-50 text-amber-700 border-amber-200',
};

export default function AdminGallery() {
  const [images, setImages]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [uploading, setUploading]       = useState(false);
  const [deleting, setDeleting]         = useState(null);
  const [filterCat, setFilterCat]       = useState('');
  const [search, setSearch]             = useState('');
  const [cloudinaryActive, setCloudinaryActive] = useState(false);

  // Upload Form state
  const [file, setFile]                 = useState(null);
  const [preview, setPreview]           = useState(null);
  const [caption, setCaption]           = useState('');
  const [captionNp, setCaptionNp]       = useState('');
  const [category, setCategory]         = useState('Our Clinic');
  const fileRef = useRef(null);

  // Edit Modal State
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editCaption, setEditCaption]   = useState('');
  const [editCaptionNp, setEditCaptionNp] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [savingEdit, setSavingEdit]     = useState(false);

  // Zoom Preview
  const [zoomImg, setZoomImg]           = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/gallery', { params: { limit: 100 } });
      setImages(res.data.data.gallery || []);
      if (res.data.data.cloudinaryConfigured !== undefined) {
        setCloudinaryActive(res.data.data.cloudinaryConfigured);
      }
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleFile = (f) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { toast.error('File must be under 5 MB'); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearFile = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { toast.error('Please select an image'); return; }
    if (!caption.trim()) { toast.error('Caption is required'); return; }

    const fd = new FormData();
    fd.append('image',      file);
    fd.append('caption',    caption.trim());
    if (captionNp.trim()) fd.append('captionNp', captionNp.trim());
    fd.append('category',   category);

    setUploading(true);
    try {
      await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Image uploaded successfully!');
      clearFile();
      setCaption('');
      setCaptionNp('');
      setCategory('Our Clinic');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image from the gallery?')) return;
    setDeleting(id);
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Image deleted successfully');
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const openEdit = (img) => {
    setEditingPhoto(img);
    setEditCaption(img.caption || '');
    setEditCaptionNp(img.captionNp || '');
    setEditCategory(img.category || 'Our Clinic');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPhoto) return;
    if (!editCaption.trim()) { toast.error('Caption cannot be empty'); return; }

    setSavingEdit(true);
    try {
      await api.put(`/gallery/${editingPhoto._id}`, {
        caption: editCaption.trim(),
        captionNp: editCaptionNp.trim(),
        category: editCategory,
      });
      toast.success('Gallery photo updated!');
      setImages((prev) =>
        prev.map((img) =>
          img._id === editingPhoto._id
            ? { ...img, caption: editCaption.trim(), captionNp: editCaptionNp.trim(), category: editCategory }
            : img
        )
      );
      setEditingPhoto(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update photo');
    } finally {
      setSavingEdit(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  // Filter and search
  const filtered = images.filter((img) => {
    const matchesCat = !filterCat || img.category === filterCat || 
      (filterCat === 'Our Branches' && img.category === 'Branches') ||
      (filterCat === 'Our Clinic' && img.category === 'Clinic') ||
      (filterCat === 'Our Team' && img.category === 'Team') ||
      (filterCat === 'Dental Camps' && img.category === 'Camps') ||
      (filterCat === 'Happy Patients' && img.category === 'Smiles');

    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
      img.caption?.toLowerCase().includes(q) ||
      img.captionNp?.toLowerCase().includes(q) ||
      img.category?.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Manager</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage, edit, and control all {images.length} photos shown across the website
          </p>
        </div>
        <div>
          {cloudinaryActive ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Cloud className="h-3.5 w-3.5 text-emerald-600" /> Cloudinary Active
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Local Storage Mode
            </div>
          )}
        </div>
      </div>

      {/* ── Upload New Photo ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
          <ImagePlus className="h-5 w-5 text-primary-600" />
          Upload New Photo to Gallery
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !preview && fileRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer
              ${preview ? 'border-primary-300 bg-primary-50/30' : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/20'}
              ${preview ? 'p-3' : 'p-10 flex flex-col items-center justify-center text-center'}`}
          >
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-xl" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">{file?.name}</p>
              </div>
            ) : (
              <>
                <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-3">
                  <Upload className="h-7 w-7 text-primary-400" />
                </div>
                <p className="font-semibold text-gray-700 text-sm">Drop image here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP, GIF · Max 5 MB</p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="label">Category</label>
              <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-1">
              <label className="label">Caption (English) <span className="text-red-400">*</span></label>
              <input
                className="input"
                placeholder="e.g. Main Branch Reception, Butwal-6"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={200}
                required
              />
            </div>
            <div className="sm:col-span-1">
              <label className="label">Caption (Nepali / नेपाली)</label>
              <input
                className="input"
                placeholder="उदा. मुख्य शाखा स्वागत कक्ष, बुटवल-६"
                value={captionNp}
                onChange={(e) => setCaptionNp(e.target.value)}
                maxLength={250}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || !file}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            {uploading ? <Spinner size="sm" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading Photo…' : 'Upload Photo'}
          </button>
        </form>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-wrap">
          {['', ...CATS].map((c) => {
            const count = c 
              ? images.filter((i) => i.category === c || 
                  (c === 'Our Branches' && i.category === 'Branches') ||
                  (c === 'Our Clinic' && i.category === 'Clinic') ||
                  (c === 'Our Team' && i.category === 'Team') ||
                  (c === 'Dental Camps' && i.category === 'Camps') ||
                  (c === 'Happy Patients' && i.category === 'Smiles')).length 
              : images.length;

            return (
              <button
                key={c || 'all'}
                onClick={() => setFilterCat(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  filterCat === c 
                    ? 'bg-primary-700 text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {c || 'All Photos'} <span className="ml-1 opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            className="input pl-9 py-1.5 text-xs rounded-xl"
            placeholder="Search by caption, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Photo Grid ── */}
      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center">
          <Images className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">No matching photos found</p>
          <p className="text-sm text-gray-400 mt-1">Try another category filter or search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div 
              key={img._id} 
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="aspect-[4/3] bg-gray-900 overflow-hidden relative cursor-pointer" onClick={() => setZoomImg(img)}>
                <img
                  src={img.imageUrl}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Zoom Icon Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>

                {/* Source Badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  {(img.source === 'cloudinary' || img.imageUrl?.includes('cloudinary.com')) ? (
                    <span className="text-[10px] font-bold bg-sky-600/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow">
                      <Cloud className="h-3 w-3" /> Cloudinary
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-gray-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-md shadow">
                      Static Asset
                    </span>
                  )}
                </div>

                {/* Action Buttons (Edit & Delete) */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(img); }}
                    className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-primary-600 shadow-lg transition-transform hover:scale-110"
                    title="Edit Caption & Category"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(img._id); }}
                    disabled={deleting === img._id}
                    className="p-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-lg transition-transform hover:scale-110 disabled:opacity-50"
                    title="Delete Image"
                  >
                    {deleting === img._id ? <Spinner size="sm" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Caption & Category Card Body */}
              <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${CAT_BADGES[img.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                      {img.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                    {img.caption}
                  </h4>
                  {img.captionNp && (
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                      {img.captionNp}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                  <span>ID: {img._id ? img._id.slice(-6) : ''}</span>
                  <button
                    onClick={() => openEdit(img)}
                    className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setEditingPhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-primary-600" /> Edit Gallery Photo
              </h3>
              <button 
                onClick={() => setEditingPhoto(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="rounded-xl overflow-hidden max-h-44 bg-gray-100 border border-gray-200">
                <img src={editingPhoto.imageUrl} alt="" className="w-full h-44 object-cover" />
              </div>

              <div>
                <label className="label">Category</label>
                <select 
                  className="input" 
                  value={editCategory} 
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="label">English Caption <span className="text-red-400">*</span></label>
                <input
                  className="input"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  maxLength={200}
                  required
                />
              </div>

              <div>
                <label className="label">Nepali Caption (नेपाली)</label>
                <input
                  className="input"
                  value={editCaptionNp}
                  onChange={(e) => setEditCaptionNp(e.target.value)}
                  maxLength={250}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                >
                  {savingEdit ? <Spinner size="sm" /> : <Check className="h-4 w-4" />}
                  {savingEdit ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Zoom Preview Modal ── */}
      {zoomImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setZoomImg(null)}
        >
          <button
            onClick={() => setZoomImg(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img src={zoomImg.imageUrl} alt={zoomImg.caption} className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" />
            <div className="text-center bg-black/60 border border-white/10 px-6 py-3 rounded-2xl max-w-xl">
              <span className="text-[10px] font-bold text-accent-300 uppercase tracking-widest">{zoomImg.category}</span>
              <p className="text-white text-sm font-semibold mt-0.5">{zoomImg.caption}</p>
              {zoomImg.captionNp && <p className="text-gray-400 text-xs mt-0.5">{zoomImg.captionNp}</p>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
