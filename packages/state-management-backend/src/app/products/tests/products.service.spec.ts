import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../services/products.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: EntityRepository<Product>;

  const mockProductRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    persistAndFlush: jest.fn(),
    flush: jest.fn(),
    assign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAllProducts', () => {
    it('should return paginated data of products', async () => {
      const page = 1;
      const limit = 10;
      const productName = 'Product';

      const products = [
        { productId: 'uuid', productName: 'Product 1' },
        { productId: 'uuid2', productName: 'Product 2' },
      ];
      const total = 2;

      mockProductRepository.findAndCount.mockReturnValue([products, total]);

      const result = await service.findAllProducts({
        page,
        limit,
        productName,
      });

      expect(result).toEqual({
        data: products,
        currentPage: page,
        totalItems: 2,
        totalPages: Math.ceil(total / limit),
      });
      expect(productRepository.findAndCount).toHaveBeenCalledWith(
        { productName: { $ilike: `%${productName}%` } },
        {
          offset: (page - 1) * limit,
          limit,
        }
      );
    });
  });

  describe('findOneProduct', () => {
    it('should return a product', async () => {
      const productId = 'uuid';
      const product = { productId: productId, productName: 'Product' };

      mockProductRepository.findOne.mockReturnValue(product);

      const result = await service.findOneProduct(productId);

      expect(result).toEqual(product);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        productId: productId,
      });
    });

    it('should throw NotFoundException if product is not found', async () => {
      const productId = 'uuid';

      mockProductRepository.findOne.mockReturnValue(undefined);

      await expect(service.findOneProduct(productId)).rejects.toThrowError(
        'product not found'
      );
      expect(productRepository.findOne).toHaveBeenCalledWith({
        productId: productId,
      });
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const productDto: CreateProductDto = {
        productName: 'Product',
        description: 'test',
        price: 0,
        discount: 0,
        stock: 0,
        status: 'test',
      };
      const product = { productId: 'uuid', ...productDto };

      mockProductRepository.create.mockReturnValue(product);

      const result = await service.createProduct(productDto);

      expect(result).toEqual(product);
      expect(productRepository.create).toHaveBeenCalledWith(productDto);
      expect(productRepository.persistAndFlush).toHaveBeenCalledWith(product);
    });
  });

  describe('UpdateProduct', () => {
    it('should update and return a product', async () => {
      mockProductRepository.assign.mockImplementation((product, updateInfo) => {
        Object.assign(product, updateInfo);
      });

      const productDto: CreateProductDto = {
        productName: 'Product',
        description: 'test',
        price: 0,
        discount: 0,
        stock: 0,
        status: 'test',
      };
      const productBefore = { productId: 'uuid', ...productDto };
      const updateProductDto: Partial<CreateProductDto> = {
        productName: 'Product Updated',
      };
      mockProductRepository.findOne.mockReturnValue(productBefore);
      const productId = 'uuid';
      const result = await service.UpdateProduct(productId, updateProductDto);
      expect(result.productName).toEqual(updateProductDto.productName);
    });
  });
});
