import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

const TOTAL_PAGES = 5;

const baseProducts = [
  {
    name: 'Ração Premier para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1669836858199.jpg',
    category: 'DOGS',
  },
  {
    name: 'Ração Fórmula Natural Pró para Cães Adultos de Porte Médio e Grande',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1647976999543.jpg',
    category: 'DOGS',
  },
  {
    name: 'Moletom para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1647292785829.jpg',
    category: 'DOGS',
  },
  {
    name: 'Macacão para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1669738862596.jpg',
    category: 'DOGS',
  },
  {
    name: 'Moletom Marvel para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1662144115438.jpg',
    category: 'DOGS',
  },
  {
    name: 'Casaco para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1646770429643.jpg',
    category: 'DOGS',
  },
  {
    name: 'Bolinhas para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1582822321392.jpg',
    category: 'DOGS',
  },
  {
    name: 'Macaco Chalesco para cães',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1531491431642.jpg',
    category: 'DOGS',
  },
  {
    name: 'Arranhador para gato',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1608212202034.jpg',
    category: 'CATS',
  },
  {
    name: 'Fantasia de dinossauro Cansei de ser gato',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1672772018766.jpg',
    category: 'CATS',
  },
  {
    name: 'Moletom Canse de ser gato',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1672770677293.jpg',
    category: 'CATS',
  },
  {
    name: 'Ração Golden para gatos',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1658413914571.jpg',
    category: 'CATS',
  },
  {
    name: 'Ração Premier Úmida para gatos',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1649268353295.jpg',
    category: 'CATS',
  },
  {
    name: 'Ração Golden para gatos castrados',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1658414449229.jpg',
    category: 'CATS',
  },
  {
    name: 'Brinquedo Varinha com pena e guizo',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1613486435135.jpg',
    category: 'CATS',
  },
  {
    name: 'Brinquedo ratinho com corda',
    description: faker.lorem.paragraph(),
    image_url: 'https://images.petz.com.br/fotos/1646252276438.jpg',
    category: 'CATS',
  },
];

const allProducts = new Array(TOTAL_PAGES).fill(1).reduce((acc) => {
  const products = baseProducts
    .map((product) => ({
      ...product,
      id: randomUUID(),
      price_in_cents: faker.number.int({
        min: 2000,
        max: 10000,
      }),
      sales: faker.number.int(40),
      created_at: faker.date.past(),
    }))
    .sort(() => 0.5 - Math.random());

  return [...acc, ...products];
}, []);

@Injectable()
export class ProductsService {
  private readonly products: Product[] = allProducts;

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductsSortedByOrder(
    sortField: string,
    sortOrder: string,
  ): Promise<Product[]> {
    if (sortOrder === 'ASC') {
      const sortedProducts = this.products
        .slice()
        .sort((productA, productB) => {
          return productA[sortField] - productB[sortField];
        });

      return sortedProducts;
    } else {
      const sortedProducts = this.products
        .slice()
        .sort((productA, productB) => {
          return productB[sortField] - productA[sortField];
        });
      return sortedProducts;
    }
  }

  async getProductsByCategory(
    sortField: string,
    sortOrder: string,
    category: string,
  ): Promise<Product[]> {
    const productsSortedByFieldAndOrder = await this.getProductsSortedByOrder(
      sortField,
      sortOrder,
    );

    const productsFiltered = productsSortedByFieldAndOrder.filter(
      (product) => product.category === category,
    );

    return productsFiltered;
  }

  async findOneById(id: string): Promise<Product> {
    return this.products.find((product) => product.id === id);
  }
}
