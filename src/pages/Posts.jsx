
import { useEffect, useState } from "react";
import { getPosts, getUsers } from "../services/postService";
import { Link } from "react-router-dom";
import { ArrowUpRight, Trash2 } from "lucide-react";
import api from "../services/api";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Fetch posts and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          getPosts(),
          getUsers(),
        ]);

        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Posts API error:", err);
        setError("Unable to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete post
  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(postId);

      await api.delete(`/posts/${postId}`);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );

      const remainingPosts = posts.length - 1;
      const totalPagesAfterDelete = Math.ceil(
        remainingPosts / postsPerPage
      );

      if (currentPage > totalPagesAfterDelete) {
        setCurrentPage(Math.max(1, totalPagesAfterDelete));
      }
    } catch (err) {
      console.error("Delete post error:", err);
      alert("Unable to delete post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#353044] dark:text-white">
          All Posts
        </h1>

        <p className="mt-1 text-sm text-[#82758F] dark:text-gray-400">
          Manage and view all your published posts.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="py-8 text-center text-[#82758F] dark:text-gray-400">
          Loading posts...
        </p>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="rounded-xl bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </p>
      )}

      {/* Posts List */}
      {!loading && !error && (
        <>
          <div className="space-y-4">
            {currentPosts.map((post) => {
              const author = users.find(
                (user) => user.id === post.userId
              );

              return (
                <article
                  key={post.id}
                  className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition hover:border-purple-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-purple-700"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">
                      <h2 className="font-semibold capitalize text-[#353044] dark:text-white">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-[#82758F] dark:text-gray-400">
                        {post.body}
                      </p>

                      <p className="mt-3 text-xs font-medium text-purple-600 dark:text-purple-400">
                        By: {author?.name ?? "Unknown author"}
                      </p>

                      <Link
                        to={`/posts/${post.id}`}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        View Details
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                      {deletingId === post.id ? "Deleting..." : "Delete"}
                    </button>

                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-purple-200 px-4 py-2 text-sm text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-purple-300 dark:hover:bg-gray-800"
              >
                Previous
              </button>

              <span className="text-sm text-[#353044] dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-purple-200 px-4 py-2 text-sm text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-purple-300 dark:hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Posts;
