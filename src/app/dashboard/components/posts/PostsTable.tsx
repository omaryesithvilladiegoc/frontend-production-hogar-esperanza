import { motion } from 'framer-motion';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  Heart,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePostsContext } from '@/app/context/posts';
import { IPost } from '@/interfaces/interfaces';

interface PostsTableProps {
  searchQuery?: string;
  onEdit?: (post: IPost) => void;
}

export function PostsTable({ searchQuery = '', onEdit }: PostsTableProps) {
  const { posts, deletePost, isLoading } = usePostsContext();

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      toast.success('Post eliminado correctamente');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'No se pudo eliminar el post';
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100 hover:bg-transparent">
              <TableHead className="text-[#6E6E6E] font-medium">
                Post
              </TableHead>

              <TableHead className="text-[#6E6E6E] font-medium">
                Autor
              </TableHead>

              <TableHead className="text-[#6E6E6E] font-medium">
                Likes
              </TableHead>

              <TableHead className="text-[#6E6E6E] font-medium">
                Comentarios
              </TableHead>

              <TableHead className="text-[#6E6E6E] font-medium">
                Grid
              </TableHead>

              <TableHead className="text-[#6E6E6E] font-medium">
                Creado
              </TableHead>

              <TableHead className="text-[#6E6E6E] font-medium text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPosts.map((post, index) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    )}

                    <div>
                      <p className="font-medium text-[#111111]">
                        {post.title}
                      </p>

                      <p className="text-sm text-[#6E6E6E] line-clamp-1">
                        {post.subtitle}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-[#6E6E6E]">Admin</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-[#6E6E6E]">
                    <Heart className="w-4 h-4" />
                    0
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-[#6E6E6E]">
                    <MessageCircle className="w-4 h-4" />
                    0
                  </div>
                </TableCell>

                <TableCell className="text-[#6E6E6E]">
                  {post.size}/12
                </TableCell>

                <TableCell className="text-[#6E6E6E]">
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="cursor-pointer gap-2">
                        <Eye className="w-4 h-4" />
                        Ver
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onClick={() => onEdit?.(post)}
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                        onClick={() => void handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {isLoading && (
        <div className="py-12 text-center text-sm text-[#6E6E6E]">
          Cargando posts...
        </div>
      )}

      {!isLoading && filteredPosts.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>

          <h3 className="text-lg font-medium text-[#111111]">
            No se encontraron posts
          </h3>

          <p className="text-sm text-[#6E6E6E] mt-1">
            Intenta con una búsqueda diferente o crea un nuevo post.
          </p>
        </div>
      )}
    </motion.div>
  );
}
