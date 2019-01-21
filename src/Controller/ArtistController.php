<?php
// src/Controller/ArtistController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/artist", name="artist_")
 */
class ArtistController extends AbstractController
{

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
        return $this->json([
            'albums' => [
                ['title' => 'One'],
                ['title' => 'Two'],
                ['title' => 'Three'],
                ['title' => 'Four'],
            ],
        ]);
    }

    /**
     * @Route("/album-top10", name="album_top10")
     */
    public function albumTop10()
    {
        return $this->json([
            'albums' => [
                ['title' => 'Twelve'],
                ['title' => 'Eleven'],
                ['title' => 'Thirteen'],
                ['title' => 'Fourteen'],
            ],
        ]);
    }
}
