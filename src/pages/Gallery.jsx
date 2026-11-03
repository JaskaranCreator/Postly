
import { useEffect, useState } from "react";
import { X, Search, Image as ImageIcon } from "lucide-react";
import api from "../services/api";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all albums when Gallery loads
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get("/albums");

        setAlbums(response.data);

        if (response.data.length > 0) {
          setSelectedAlbum(String(response.data[0].id));
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Albums API error:", err);
        setError("Unable to load albums. Please try again.");
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Fetch photos whenever the selected album changes
  useEffect(() => {
    if (!selectedAlbum) return;

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/albums/${selectedAlbum}/photos`
        );

        setPhotos(response.data);
      } catch (err) {
        console.error("Photos API error:", err);
        setError("Unable to load photos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [selectedAlbum]);

  // Search photos by title
  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#353044] dark:text-white">
          Photo Gallery
        </h1>
        <p className="mt-1 text-sm text-[#82758F] dark:text-gray-400">
          Browse and manage your photo albums.
        </p>
      </div>

      {/* Album Selection and Search */}
      <div className="flex flex-col gap-4 rounded-2xl border border-purple-100 bg-white p-5 transition-colors duration-300 sm:flex-row dark:border-gray-700 dark:bg-gray-900">

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-[#353044] dark:text-gray-300">
            Select Album
          </label>

          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-purple-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-[#353044] dark:text-gray-300">
            Search Photos
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69BB0] dark:text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search photo titles..."
              className="w-full rounded-xl border border-purple-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-purple-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Photo Count */}
      {!loading && !error && (
        <div className="flex items-center gap-2 text-sm text-[#82758F] dark:text-gray-400">
          <ImageIcon size={18} />
          <span>{filteredPhotos.length} photos found</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <p className="py-10 text-center text-sm text-[#82758F] dark:text-gray-400">
          Loading photos...
        </p>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="rounded-xl bg-red-50 p-4 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Empty State */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-10 text-center text-sm text-[#82758F] dark:text-gray-400">
          No photos found.
        </p>
      )}

      {/* Photo Grid */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="group overflow-hidden rounded-xl border border-purple-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-purple-700"
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                loading="lazy"
                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <p className="line-clamp-2 p-3 text-sm font-medium text-[#353044] dark:text-gray-200">
                {photo.title}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Image Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-4 shadow-xl transition-colors duration-300 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white p-2 text-[#353044] shadow-md hover:bg-purple-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              aria-label="Close image"
            >
              <X size={22} />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-h-[70vh] w-full rounded-xl object-contain"
            />

            <h2 className="mt-4 font-semibold text-[#353044] dark:text-white">
              {selectedPhoto.title}
            </h2>

            <p className="mt-1 text-xs text-[#82758F] dark:text-gray-400">
              Album #{selectedPhoto.albumId} · Photo #{selectedPhoto.id}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Gallery;
