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
            'foo' => 'bar',
        ]);
    }
}
