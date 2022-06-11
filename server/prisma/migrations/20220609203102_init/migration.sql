-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "reference_no" TEXT NOT NULL,
    "tax" INTEGER NOT NULL,
    "service_charge" INTEGER NOT NULL,
    "total_amount_rm" DECIMAL(65,30) NOT NULL,
    "is_walkin" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" BIGINT NOT NULL,
    "cost_per_item" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orders_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "order_id" BIGINT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paid_amount_rm" DECIMAL(65,30) NOT NULL,
    "orders_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orders_reference_no_key" ON "orders"("reference_no");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_order_id_key" ON "order_items"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_order_id_key" ON "transaction"("order_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orders_id_fkey" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_orders_id_fkey" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
