<?php
// src/Controller/IndexController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/", name="index_")
 */
class IndexController extends AbstractController
{

    /**
     * @Route("", name="index")
     */
    public function index()
    {
        return $this->render('index/index.html.twig');
    }
}
