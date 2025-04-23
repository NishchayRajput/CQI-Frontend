import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from '../../products-table';
// import Courses from '../../courses';
import Statistics from './statistics';



export default async function Feedback(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {

  const products = [
    {
      id: 1,
      name: 'Product A',
      category: 'Category 1',
      price: '100.00', // Changed to string
      stock: 50,
      status: 'active', // Changed to match the expected union type
      imageUrl: '/images/product-a.jpg', // Added imageUrl
      availableAt: new Date('2025-04-01'), // Added availableAt
    },
    {
      id: 2,
      name: 'Product B',
      category: 'Category 2',
      price: '200.00',
      stock: 30,
      status: 'inactive',
      imageUrl: '/images/product-b.jpg',
      availableAt: new Date('2025-04-05'),
    },
    {
      id: 3,
      name: 'Product C',
      category: 'Category 1',
      price: '150.00',
      stock: 20,
      status: 'archived',
      imageUrl: '/images/product-c.jpg',
      availableAt: new Date('2025-04-10'),
    },
    {
      id: 4,
      name: 'Product D',
      category: 'Category 3',
      price: '250.00',
      stock: 10,
      status: 'active',
      imageUrl: '/images/product-d.jpg',
      availableAt: new Date('2025-04-15'),
    },
    {
      id: 5,
      name: 'Product E',
      category: 'Category 2',
      price: '300.00',
      stock: 0,
      status: 'inactive',
      imageUrl: '/images/product-e.jpg',
      availableAt: new Date('2025-04-20'),
    },
  ];

  const newOffset = 0;
  const totalProducts = products.length;

  return (
    <Tabs defaultValue="feedback">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="feedback">Feedbacks</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          {/* <TabsTrigger value="draft">Draft</TabsTrigger> */}
          
        </TabsList>
        {/* <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div> */}
      </div>
      <TabsContent value="feedback">
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
      <TabsContent value="statistics">
        <Statistics />
      </TabsContent>
    </Tabs>
  );
}
