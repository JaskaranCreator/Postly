
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil, X } from "lucide-react";
import api from "../services/api";
import { getUsers } from "../services/postService";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [success, setSuccess] = useState("");


  // Post, author, and comments are fetched together
  // to display all related information on one page.
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const [postResponse, usersResponse, commentsResponse] =
          await Promise.all([
            api.get(`/posts/${id}`),
            getUsers(),
            api.get(`/posts/${id}/comments`),
          ]);

        setPost(postResponse.data);

        const foundAuthor = usersResponse.find(
          (user) => user.id === postResponse.data.userId
        );

        setAuthor(foundAuthor || null);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error("Post details error:", err);
        setError(
          `Unable to load post details. ${err.response?.status || err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Open edit form
  const handleEdit = () => {
    setEditTitle(post.title);
    setEditBody(post.body);
    setEditError("");
    setSuccess("");
    setIsEditing(true);
  };

  // Save updated post
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editTitle.trim() || !editBody.trim()) {
      setEditError("Please fill in both fields.");
      return;
    }

    try {
      setSaving(true);
      setEditError("");
      setSuccess("");

      const response = await api.put(`/posts/${id}`, {
        ...post,
        title: editTitle.trim(),
        body: editBody.trim(),
      });

      setPost(response.data);
      setIsEditing(false);
      setSuccess("Post updated successfully!");
    } catch (err) {
      console.error("Update post error:", err);
      setEditError("Unable to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="p-6 text-[#82758F] dark:text-gray-400">
        Loading post details...
      </p>
    );
  }

  if (error || !post) {
    return (
      <div className="space-y-4 p-6">
        <p className="text-red-600 dark:text-red-400">
          {error || "Post not found."}
        </p>
        <Link
          to="/posts"
          className="text-purple-600 hover:underline dark:text-purple-400"
        >
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/posts"
        className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
      >
        <ArrowLeft size={18} />
        Back to Posts
      </Link>

      {/* Post Details */}
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
            Post #{post.id}
          </p>

          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-2 rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-900/60"
          >
            <Pencil size={16} />
            Edit Post
          </button>
        </div>

        {success && (
          <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
            {success}
          </p>
        )}

        <h1 className="mt-3 text-2xl font-bold text-[#353044] dark:text-white">
          {post.title}
        </h1>

        <p className="mt-4 leading-7 text-[#82758F] dark:text-gray-400">
          {post.body}
        </p>
      </section>

      {/* Edit Form */}
      {isEditing && (
        <section className="rounded-2xl border border-purple-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#353044] dark:text-white">
              Edit Post
            </h2>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Post Title
              </label>

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-xl border border-purple-100 bg-white p-3 text-gray-800 outline-none focus:border-purple-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                rows={5}
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full resize-none rounded-xl border border-purple-100 bg-white p-3 text-gray-800 outline-none focus:border-purple-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {editError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {editError}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Author Details */}
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-bold text-[#353044] dark:text-white">
          Author Details
        </h2>

        {author ? (
          <div className="mt-4 space-y-2 text-sm text-[#82758F] dark:text-gray-400">
            <p><strong className="text-gray-800 dark:text-gray-200">Name:</strong> {author.name}</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Email:</strong> {author.email}</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Website:</strong> {author.website}</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Company:</strong> {author.company.name}</p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-[#82758F] dark:text-gray-400">
            Author information is unavailable.
          </p>
        )}
      </section>

      {/* Comments */}
      <section className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-bold text-[#353044] dark:text-white">
          Comments ({comments.length})
        </h2>

        <div className="mt-5 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-xl border border-purple-50 p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="font-semibold text-[#353044] dark:text-gray-100">
                  {comment.name}
                </h3>

                <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                  {comment.email}
                </p>

                <p className="mt-3 text-sm leading-6 text-[#82758F] dark:text-gray-400">
                  {comment.body}
                </p>
              </article>
            ))
          ) : (
            <p className="text-sm text-[#82758F] dark:text-gray-400">
              No comments found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default PostDetails;
