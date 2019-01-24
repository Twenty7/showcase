<?php

namespace App\Repository;

use App\Entity\Album;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Album|null find($id, $lockMode = null, $lockVersion = null)
 * @method Album|null findOneBy(array $criteria, array $orderBy = null)
 * @method Album[]    findAll()
 * @method Album[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlbumRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Album::class);
    }

    /**
     * Format Criteria for SQL Query
     */
    private function criteria($criteria)
    {
        if (empty($criteria)) {
            return null;
        }
        return ' AND ' . implode(' AND ', $criteria);
    }

    /**
     * Format Order By for SQL Query
     */
    private function orderBy($order_by)
    {
        if (empty($order_by)) {
            return null;
        }
        return ' ORDER BY ' . implode(', ', $order_by);
    }

    /**
     * Returns the sub-query 
     */
    private function buildAlbumSelectQuery($criteria = [], $order_by = [], $limit = 24)
    {
        $criteria_sql = $this->criteria($criteria);
        $order_sql = $this->orderBy($order_by);
        $sql = "
            SELECT 
                rg.id,
                rg.gid,
                rg.name,
                rj.first_release_date_year AS release_year,
                rj.rating,
                rj.rating_count,
                l.name AS lang,
                ac.name AS artist_name,
                (
                    SELECT 
                        SUM(m.track_count) AS track_cnt
                    FROM musicbrainz.medium AS m
                    WHERE m.release = r.id
                    GROUP BY m.release 
                ) as track_cnt
            FROM (
                SELECT r_inner.release_group, rgm_inner.rating, rgm_inner.rating_count, rgm_inner.first_release_date_year, MAX(r_inner.id) AS max_id
                FROM musicbrainz.release AS r_inner
                JOIN musicbrainz.release_group_meta AS rgm_inner ON rgm_inner.id = r_inner.release_group
                JOIN musicbrainz.artist_credit AS ac_inner ON ac_inner.id = r_inner.artist_credit
                WHERE r_inner.status = '1' AND r_inner.status IS NOT NULL
                    {$criteria_sql}
                GROUP BY r_inner.release_group, rgm_inner.rating, rgm_inner.rating_count, rgm_inner.first_release_date_year
                {$order_sql}
                LIMIT {$limit}
            ) AS rj 
            JOIN musicbrainz.release_group AS rg ON rg.id = rj.release_group
            JOIN musicbrainz.release AS r ON rj.max_id = r.id
            JOIN musicbrainz.artist_credit AS ac ON ac.id = r.artist_credit
            JOIN musicbrainz.language AS l ON l.id = r.language    
        ";
        return $sql;
    }

    /**
     * List the Top 10 Rated Albums
     * @return array[] Returns an array of Album data
     */
    public function findTop10()
    {
        $criteria = ['rgm_inner.rating IS NOT NULL', 'rgm_inner.rating_count > :rating_count'];
        $params = ['rating_count' => 20];
        $order_by = ["rgm_inner.rating DESC", "rgm_inner.rating_count DESC"];
        $limit = 12;
        $sql = $this->buildAlbumSelectQuery($criteria, $order_by, $limit);
        return $this->getEntityManager()->getConnection()->executeQuery($sql, $params)->fetchAll();
    }

    /**
     * Search Albums by Album Name and Artist Name
     * @param string Search keyword
     * @return array[] Returns an array of Album data
     */
    public function searchByTitle($keyword)
    {
        $criteria = ["r_inner.name ILIKE :keyword OR ac_inner.name ILIKE :keyword"];
        $params = ['keyword' => '%' . $keyword . '%'];
        $order_by = [];
        $limit = 12;
        $sql = $this->buildAlbumSelectQuery($criteria, $order_by, $limit);
        return $this->getEntityManager()->getConnection()->executeQuery($sql, $params)->fetchAll();
    }

}
