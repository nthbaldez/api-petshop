import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  allProducts(
    @Args('sortField', { defaultValue: '', nullable: true }) sortField?: string,
    @Args('sortOrder', { defaultValue: '', nullable: true }) sortOrder?: string,
    @Args('category', { defaultValue: '', nullable: true }) category?: string,
  ) {
    if (sortField !== '' && sortOrder !== '' && category === '') {
      const sortedProducts = this.productsService.getProductsSortedByOrder(
        sortField,
        sortOrder,
      );
      return sortedProducts;
    } else if (category !== '') {
      const sortedProductsByCategory =
        this.productsService.getProductsByCategory(
          sortField,
          sortOrder,
          category,
        );
      return sortedProductsByCategory;
    } else {
      return this.productsService.getAllProducts();
    }
  }

  @Query(() => Product)
  Product(@Args('id') id: string) {
    return this.productsService.findOneById(id);
  }
}
