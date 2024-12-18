import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPosts } from "../services/api";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Post } from "../types";
import { motion } from "framer-motion";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement>(null);

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newPosts = await fetchPosts(page, 10);
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      if (newPosts.length < 10) setHasMore(false);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadPosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loadPosts, hasMore, loading]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1
        className="text-2xl text-center font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Posts
      </motion.h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="py-8">
          <LoadingSpinner />
        </div>
      )}

      <div ref={loaderRef} className="h-10"></div>

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 py-8">No more posts to load</p>
      )}

      {!hasMore && posts.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-8">No posts found</p>
      )}
    </div>
  );
};

export default Posts;
