"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Bookmark = {
  id: string;
  title: string;
  url: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // 🔒 Protect dashboard
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/");
        return;
      }

      setUserId(session.user.id);
      fetchBookmarks(session.user.id);
      setLoading(false);
    };

    checkSession();
  }, [router]);

  // 📥 Fetch bookmarks
  const fetchBookmarks = async (uid: string) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  // ➕ Add bookmark
  const addBookmark = async () => {
    if (!title || !url || !userId) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: userId,
    });

    setTitle("");
    setUrl("");
    fetchBookmarks(userId);
  };

  // ❌ Delete bookmark
  const deleteBookmark = async (id: string) => {
    if (!userId) return;

    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks(userId);
  };

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">My Bookmarks</h1>
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Add Bookmark */}
        <input
          className="border p-2 w-full mb-2"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addBookmark}
          className="w-full bg-black text-white py-2 rounded mb-6"
        >
          Add Bookmark
        </button>

        {/* Bookmark List */}
        <ul>
          {bookmarks.length === 0 && (
            <p className="text-gray-500 text-center">
              No bookmarks yet
            </p>
          )}

          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="flex justify-between items-center mb-3"
            >
              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {bookmark.title}
              </a>

              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
