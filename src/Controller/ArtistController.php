<?php
// src/Controller/ArtistController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Artist;
use App\Entity\Album;

/**
 * @Route("/artist", name="artist_")
 */
class ArtistController extends AbstractController
{

    /**
     * Parse and return request body json
     * @return array $params
     */
    private function getJsonRequestData()
    {
        $request = Request::createFromGlobals();
        $content = $request->getContent();
        if (!empty($content)) {
            $params = json_decode($content, true);
        }
        return $params;
    }

    /**
     * @Route("", name="index")
     */
    public function index()
    {
        return $this->render('artist/index.html.twig', [
            'album' => 'foobar',
        ]);
    }

    /**
     * @Route("/album-search", name="album_search")
     */
    public function albumSearch()
    {
        $params = $this->getJsonRequestData();
        $album_results = $this->getDoctrine()
            ->getRepository(Album::class)
            ->searchByTitle($params['search-string']);

        return $this->json([
            'albums' => $album_results,
        ]);
    }

    /**
     * @Route("/album-top10", name="album_top10")
     */
    public function albumTop10()
    {
        $top_albums = $this->getDoctrine()
            ->getRepository(Album::class)
            ->findTop10();

        return $this->json([
            'albums' => $top_albums,
        ]);
    }
}
