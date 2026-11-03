
import {
  FileText,
  Images,
  Users,
  MessageCircle,
  ArrowUpRight,
  Plus,
  Search,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts, getUsers } from "../services/postService";
import api from "../services/api";
import CreatePostModal from "../components/posts/CreatePostModal";

function Dashboard() {

// Posts and users are loaded together so each post
// can be displayed with its corresponding author information.
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, usersData, albumsResponse, commentsResponse] =
          await Promise.all([
            getPosts(),
            getUsers(),
            api.get("/albums"),
            api.get("/comments"),
          ]);

        setPosts(postsData);
        setUsers(usersData);
        setAlbums(albumsResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error("Dashboard API error:", err);
        setError("Unable to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add newly created post
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.body.toLowerCase().includes(searchText);

    const matchesAuthor =
      authorFilter === "all" ||
      post.userId === Number(authorFilter);

    return matchesSearch && matchesAuthor;
  });

  // Dashboard statistics
  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: FileText,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300",
    },
    {
      title: "Total Albums",
      value: albums.length,
      icon: Images,
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300",
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
    },
    {
      title: "Total Comments",
      value: comments.length,
      icon: MessageCircle,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#353044] dark:text-white">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-sm text-[#82758F] dark:text-gray-400">
            Manage your posts and content in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Create Post
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#82758F] dark:text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#353044] dark:text-white">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Author Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69BB0] dark:text-gray-400"
          />

          <input
            type="text"
            placeholder="Search posts by title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-purple-100 bg-white py-3 pl-12 pr-4 text-sm text-[#353044] outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-purple-900"
          />
        </div>

        <select
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm text-[#353044] outline-none focus:border-purple-400 sm:w-64 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="all">All Authors</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recent Posts */}
      <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition-colors sm:p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#353044] dark:text-white">
              Recent Posts
            </h2>

            <p className="mt-1 text-sm text-[#82758F] dark:text-gray-400">
              Your latest published content
            </p>
          </div>

          <Link
            to="/posts"
            className="flex items-center gap-1 text-sm font-medium text-purple-600 transition hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
          >
            View All
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="py-8 text-center text-sm text-[#82758F] dark:text-gray-400">
            Loading posts...
          </p>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="rounded-xl bg-red-50 p-4 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPosts.length === 0 && (
          <p className="py-8 text-center text-sm text-[#82758F] dark:text-gray-400">
            No matching posts found.
          </p>
        )}

        {/* Display Recent Posts */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="space-y-4">
            {filteredPosts.slice(0, 3).map((post) => {
              const author = users.find(
                (user) => user.id === post.userId
              );

              return (
                <article
                  key={post.id}
                  className="rounded-xl border border-purple-50 p-4 transition hover:bg-purple-50/40 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#353044] dark:text-white">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#82758F] dark:text-gray-400">
                        {post.body.length > 100
                          ? `${post.body.slice(0, 100)}...`
                          : post.body}
                      </p>

                      <p className="mt-3 text-xs font-medium text-purple-600 dark:text-purple-400">
                        By: {author?.name ?? "Unknown author"}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-[#A69BB0] dark:text-gray-500">
                      Post #{post.id}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}

export default Dashboard;
