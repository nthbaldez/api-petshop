import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  image_url: string;
  @Field()
  category: string;
  @Field()
  price_in_cents: number;
  @Field()
  sales: number;
  @Field()
  created_at: Date;
}
