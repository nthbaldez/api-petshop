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
      return this.productsService.getProductsSortedByOrder(
        sortField,
        sortOrder,
      );
    } else {
      return this.productsService.getProductsByCategory(
        sortField,
        sortOrder,
        category,
      );
    }
  }

  @Query(() => Product)
  Product(@Args('id') id: string) {
    return this.productsService.findOneById(id);
  }
}
