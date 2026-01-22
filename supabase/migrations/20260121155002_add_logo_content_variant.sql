-- Add Logo + Content variant for Product Visuals feature
WITH product_feature AS (
    SELECT id
    FROM features
    WHERE key = 'create_product'
)
INSERT INTO variants (feature_id, key, name, description, sort_order)
SELECT id, 'logo_content', 'Logo + Content', 'Product layout with brand logo and name overlays', 5
FROM product_feature
ON CONFLICT (feature_id, key) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    sort_order = EXCLUDED.sort_order;
