import type { User, Post, Plan, Activity, ChartData } from '../types/index.types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@example.com',
    avatar: 'https://i.pravatar.cc/150?u=1',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=2',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'María López',
    email: 'maria.lopez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=3',
    role: 'user',
    status: 'active',
    joinedAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Juan Martínez',
    email: 'juan.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=4',
    role: 'user',
    status: 'suspended',
    joinedAt: '2024-01-28',
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=5',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-04-05',
  },
  {
    id: '6',
    name: 'Pedro Hernández',
    email: 'pedro.hernandez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=6',
    role: 'user',
    status: 'inactive',
    joinedAt: '2024-02-14',
  },
  {
    id: '7',
    name: 'Sofia Torres',
    email: 'sofia.torres@example.com',
    avatar: 'https://i.pravatar.cc/150?u=7',
    role: 'user',
    status: 'active',
    joinedAt: '2024-05-01',
  },
  {
    id: '8',
    name: 'Diego Flores',
    email: 'diego.flores@example.com',
    avatar: 'https://i.pravatar.cc/150?u=8',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-03-22',
  },
];

export const mockPosts: Post[] = [
  {
    id: 'c3d9fffc-b8a4-41c8-9330-1dbf6fcbdd68',
    title: 'Cómo mejorar el cuidado de los adultos mayores',
    subtitle: 'Estrategias prácticas para su bienestar diario',
    header: 'La importancia del cuidado digno',
    mainContent: `
El cuidado de los adultos mayores requiere atención, paciencia y amor.
En Hogar Esperanza trabajamos cada día para brindar un entorno seguro y
acompañamiento emocional para nuestros residentes.

Algunas recomendaciones importantes:

• Mantener rutinas diarias saludables  
• Estimular la actividad física moderada  
• Promover actividades sociales  
• Cuidar la alimentación  

El acompañamiento familiar también juega un papel fundamental en el
bienestar emocional de nuestros adultos mayores.
    `,
    footer: 'Hogar Esperanza - Cuidando con amor y dignidad.',
    image: 'https://images.unsplash.com/photo-1581579188871-45ea61f2a3a8',

    createdAt: new Date(),

    keywords: ['adultos mayores', 'cuidado', 'bienestar', 'hogar esperanza'],

    extraImages: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309',
      'https://images.unsplash.com/photo-1576765607924-b6c7c46e6e9a',
      'https://images.unsplash.com/photo-1590080876210-941da3c96bff'
    ],

    size: 5
  },

  {
    id: 'a1f1bba1-3324-4a0f-91cc-4453ef5b3c88',
    title: 'Actividades recreativas para adultos mayores',
    subtitle: 'El poder de la recreación en la salud mental',
    header: 'La recreación también es salud',
    mainContent: `
Las actividades recreativas ayudan a mantener activa la mente y el
cuerpo de los adultos mayores.

En Hogar Esperanza realizamos:

• Talleres de arte  
• Clases de música  
• Juegos de memoria  
• Caminatas guiadas  

Estas actividades fortalecen la autoestima, reducen la ansiedad
y fomentan la interacción social.
    `,
    footer: 'Hogar Esperanza - Construyendo momentos felices.',
    image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f',

    createdAt: new Date(),

    keywords: ['recreación', 'salud mental', 'actividades', 'adultos mayores'],

    extraImages: [
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289',
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a'
    ],

    size: 4
  },

  {
    id: 'f3bb2a2c-9211-4e8f-b69e-84e63c18f8c0',
    title: 'Alimentación saludable en la tercera edad',
    subtitle: 'Claves para una nutrición equilibrada',
    header: 'La nutrición es parte del cuidado',
    mainContent: `
Una alimentación adecuada es esencial para mantener la salud
de los adultos mayores.

Recomendaciones:

• Consumir frutas y verduras diariamente  
• Reducir el consumo de sal  
• Mantener una buena hidratación  
• Comer porciones balanceadas  

En Hogar Esperanza contamos con nutricionistas que diseñan
planes alimenticios personalizados.
    `,
    footer: 'Hogar Esperanza - Promoviendo una vida saludable.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',

    createdAt: new Date(),

    keywords: ['nutrición', 'salud', 'alimentación', 'adultos mayores'],

    extraImages: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2'
    ],

    size: 3
  }
];



export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'post',
    description: 'Nueva publicación: "Bienvenidos a Hogar Esperanza"',
    timestamp: '2024-06-26T10:30:00',
  },
  {
    id: '2',
    type: 'user',
    description: 'Sofia Torres se registró como nuevo usuario',
    timestamp: '2024-06-26T09:15:00',
  },
  {
    id: '3',
    type: 'plan',
    description: 'Usuario actualizó a plan Premium',
    timestamp: '2024-06-25T16:45:00',
  },
  {
    id: '4',
    type: 'post',
    description: 'Carlos Rodríguez editó "Nuevo Programa de Voluntariado"',
    timestamp: '2024-06-25T14:20:00',
  },
  {
    id: '5',
    type: 'user',
    description: 'Diego Flores actualizó su perfil',
    timestamp: '2024-06-25T11:00:00',
  },
];

export const mockChartData: ChartData[] = [
  { name: 'Lun', posts: 12, users: 8 },
  { name: 'Mar', posts: 19, users: 12 },
  { name: 'Mié', posts: 15, users: 10 },
  { name: 'Jue', posts: 25, users: 15 },
  { name: 'Vie', posts: 22, users: 18 },
  { name: 'Sáb', posts: 8, users: 5 },
  { name: 'Dom', posts: 10, users: 7 },
];

export const mockRevenueData: ChartData[] = [
  { name: 'Ene', value: 2400 },
  { name: 'Feb', value: 3200 },
  { name: 'Mar', value: 2800 },
  { name: 'Abr', value: 4100 },
  { name: 'May', value: 3800 },
  { name: 'Jun', value: 5200 },
];

export const dashboardStats = {
  totalUsers: 2438,
  totalPosts: 156,
  activePlans: 2438,
  monthlyRevenue: 45230,
};
