'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Product } from '@/types';
import { ProductModal } from '@/views/products/productModal/productModal';
import { BackToHome } from '@/components/backToHome/backToHome';
import { ProductList } from '@/views/products/productList/productList';
import { PaginationControls } from '@/views/products/paginationControls/paginationControls';
import { usePagination } from '@/hooks/usePagination';
import { PRODUCTS_DATA } from '@/data/productsData';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const Products: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      const newUrl = `${pathname}?productId=${product.id}`;
      router.replace(newUrl);
    },
    [router, pathname],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.replace(pathname);
  }, [router, pathname]);

  useEffect(() => {
    if (!isClient) return;

    const productId = searchParams.get('productId');
    if (productId) {
      const product = PRODUCTS_DATA.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [searchParams, isClient]);

  if (!isClient) return <div>Loading...</div>;

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
