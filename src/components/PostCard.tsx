import { Post } from "../types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
        {post.title}
      </h2>
      <p className="text-gray-600">{post.body}</p>
    </div>
  );
};

export default PostCard;
