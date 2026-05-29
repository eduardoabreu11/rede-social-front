"use client";

import {
  Bookmark,
  Calendar,
  Code2,
  Globe,
  Heart,
  Info,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Header } from "../../_components/header";
import { Sidebar } from "../../_components/sideBar";

import { api } from "../../config/api";

interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

interface Post {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };

  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function GroupPage() {
  const params = useParams();

  const slug = params.id as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const [openedPostId, setOpenedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentContent, setCommentContent] = useState<Record<string, string>>({});

  const loadRoom = useCallback(async () => {
    try {
      const response = await api.get(`/rooms/${slug}`);

      setRoom(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  const loadPosts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/rooms/${slug}/posts?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  async function loadComments(postId: string) {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments((previousComments) => ({
        ...previousComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOpenComments(postId: string) {
    if (openedPostId === postId) {
      setOpenedPostId(null);
      return;
    }

    setOpenedPostId(postId);

    await loadComments(postId);
  }

  async function handleCreatePost() {
    if (!content.trim() || !room || isCreatingPost) {
      return;
    }

    setIsCreatingPost(true);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/posts",
        {
          content,
          roomId: room.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");

      await loadPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingPost(false);
    }
  }

  async function handleLike(postId: string) {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateComment(postId: string) {
    const currentComment = commentContent[postId];

    if (!currentComment || !currentComment.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/posts/${postId}/comments`,
        {
          content: currentComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentContent((previousCommentContent) => ({
        ...previousCommentContent,
        [postId]: "",
      }));

      await loadComments(postId);
      await loadPosts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function loadData() {
      await loadRoom();
      await loadPosts();
    }

    loadData();
  }, [slug, loadRoom, loadPosts]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <Sidebar />

      <section className="grid gap-8 px-6 pt-28 lg:ml-72 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white">
                <Code2 size={32} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{room?.name}</h2>

                <p className="mt-1 text-slate-500">Grupo público</p>
              </div>
            </div>

            <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white">
              Participando
            </button>
          </div>

          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-300" />

              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="No que você está pensando?"
                className="
                  h-24 flex-1 resize-none rounded-2xl
                  border border-slate-200
                  p-4 outline-none
                  focus:border-violet-500
                "
              />
            </div>

            <div className="mt-4 flex items-center justify-between pl-16">
              <div className="flex gap-4 text-slate-500">
                <Info size={22} />
                <MessageCircle size={22} />
              </div>

              <button
                type="button"
                onClick={handleCreatePost}
                disabled={isCreatingPost}
                className={`rounded-xl px-6 py-3 font-semibold text-white transition ${isCreatingPost ? "bg-slate-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}`}
              >
                {isCreatingPost ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                      {post.user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold">{post.user.name}</h3>

                      <p className="text-sm text-slate-500">
                        {new Date(post.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <span className="text-xl text-slate-400">...</span>
                </div>

                <p className="whitespace-pre-line leading-7">
                  {post.content}
                </p>

                <div className="mt-5 flex items-center gap-8 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-600">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`
                      flex items-center gap-2 transition hover:text-violet-600
                      ${post.likedByMe ? "text-violet-600" : ""}
                    `}
                  >
                    <Heart
                      size={20}
                      fill={post.likedByMe ? "currentColor" : "none"}
                    />

                    <span>{post.likesCount}</span>
                    <span>Curtidas</span>
                  </button>

                  <button
                    onClick={() => handleOpenComments(post.id)}
                    className={`
                      flex items-center gap-2 transition hover:text-violet-600
                      ${openedPostId === post.id ? "text-violet-600" : ""}
                    `}
                  >
                    <MessageCircle size={20} />

                    <span>{post.commentsCount}</span>
                    <span>Comentarios</span>
                  </button>

                  <Bookmark
                    size={20}
                    className="ml-auto text-slate-500"
                  />
                </div>

                {openedPostId === post.id && (
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-300" />

                      <input
                        value={commentContent[post.id] || ""}
                        onChange={(event) =>
                          setCommentContent((previousCommentContent) => ({
                            ...previousCommentContent,
                            [post.id]: event.target.value,
                          }))
                        }
                        placeholder="Escreva um comentário..."
                        className="
                          h-11 flex-1 rounded-2xl
                          border border-slate-200
                          px-4 outline-none
                          focus:border-violet-500
                        "
                      />

                      <button
                        onClick={() => handleCreateComment(post.id)}
                        className="rounded-2xl bg-violet-600 px-5 font-semibold text-white transition hover:bg-violet-700"
                      >
                        Enviar
                      </button>
                    </div>

                    <div className="mt-5 space-y-4">
                      {(comments[post.id] || []).map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                            {comment.user.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="flex-1 rounded-2xl bg-slate-100 px-4 py-3">
                            <div className="flex items-center justify-between gap-4">
                              <strong className="text-sm">
                                {comment.user.name}
                              </strong>

                              <span className="text-xs text-slate-500">
                                {new Date(comment.createdAt).toLocaleString(
                                  "pt-BR"
                                )}
                              </span>
                            </div>

                            <p className="mt-1 text-sm leading-6">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {(comments[post.id] || []).length === 0 && (
                        <p className="text-sm text-slate-500">
                          Nenhum comentário ainda. Seja o primeiro a comentar.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold">Sobre o grupo</h3>

            <p className="mt-6 leading-7 text-slate-700">
              {room?.description}
            </p>

            <div className="mt-6 space-y-4 border-b border-slate-200 pb-6">
              <p className="flex items-center gap-3">
                <Calendar size={20} />
                {room?.createdAt
                  ? new Date(room.createdAt).toLocaleDateString("pt-BR")
                  : ""}
              </p>

              <p className="flex items-center gap-3">
                <Globe size={20} />
                Público
              </p>

              <p className="flex items-center gap-3">
                <Users size={20} />
                Grupo acadêmico
              </p>
            </div>

            <h4 className="mt-6 font-bold">Regras do grupo</h4>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              <li>Respeite todos os membros</li>
              <li>Nada de spam</li>
              <li>Conteúdo relevante ao curso</li>
              <li>Dúvidas são sempre bem-vindas</li>
            </ul>

            <div className="mt-6 flex gap-3 rounded-2xl bg-violet-50 p-4 text-violet-800">
              <ShieldCheck size={28} />

              <p className="text-sm font-medium">
                Seja respeitoso e colaborativo. Vamos manter um ambiente
                saudável para todos!
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}