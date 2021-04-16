CREATE AGGREGATE cluster_mul(int8) (SFUNC = int8mul, STYPE = int8);
-- """Select like this"""
-- SELECT 
--   id,
--   capacity,
--   cluster_mul(capacity) OVER (ORDER BY cluster_order)
-- FROM cluster.clusters;