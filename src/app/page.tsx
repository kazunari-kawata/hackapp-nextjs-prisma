import ContactForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/dao/post";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <ContactForm />
      <PostList posts={posts} />
    </>
  );
}
