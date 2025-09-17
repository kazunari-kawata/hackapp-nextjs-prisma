import ContactForm from "@/components/ContactForm";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/post";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <ContactForm />
      <PostList posts={posts} />
    </>
  );
}
