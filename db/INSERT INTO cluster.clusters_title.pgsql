-- INSERT INTO cluster.clusters_title
-- (title)
-- VALUES
-- ('
-- 	{
-- 		"lang1": "Konteyner",
-- 		"lang2": "Container",
-- 		"lang3": "Контейнер"
-- 	}');
-- select * from cluster.clusters_title
-- delete from cluster.clusters_title
-- where id = 4

-- INSERT INTO cluster.clusters
-- (cluster_id, cluster_order, capacity, clusters_name_id)
-- VALUES
-- (1, 1, 1, 1),
-- (1, 2, 12, 2),
-- (1, 3, 3, 3),
-- (1, 4, 10, 5)

WITH RECURSIVE cl AS(

	select ccc.*, cctt.title->'lang1' from cluster.clusters ccc
	left join cluster.clusters_title cctt on ccc.clusters_name_id = cctt.id

	union ALL
	
	select cc.*, cct.title->'lang1' from cluster.clusters cc
	left join cluster.clusters_title cct on cc.clusters_name_id = cct.id
	inner join cl ON cl.id = cc.id
) SELECT * from cl
