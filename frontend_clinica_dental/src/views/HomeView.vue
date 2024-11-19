<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Slider Section Start -->
  <div class="section slider-area slider-active">
    <!-- Single Slider Start -->
    <div class="single-slider bg-cover d-flex align-items-center slider-background">
      <div class="container">
        <!-- Slider Content Start -->
        <div class="slider-content">
          <h3 class="sub-title" data-animation="fadeInDown" data-delay="0.5s">
            Nosotros gestionamos servicios dentales flexibles
          </h3>
          <h2 class="title" data-animation="fadeInUp" data-delay="0.7s">
            Atención dental de alta <br />
            calidad
          </h2>
          <p data-animation="fadeInUp" data-delay="0.9s">
            En nuestra clínica, te ofrecemos soluciones dentales integrales
            adaptadas a tus necesidades. Desde limpiezas regulares hasta
            tratamientos avanzados.
          </p>
          <a class="btn" href="#odontologos" data-animation="fadeInUp" data-delay="1s">Nuestros doctores</a>
          <RouterLink class="btn btn-white" to="" data-animation="fadeInUp" data-delay="1s">Nuestros servicios
          </RouterLink>
        </div>
        <!-- Slider Content End -->
      </div>

      <!-- Slider Image Start -->
      <div class="slider-image">
        <div class="image">
          <img src="@/assets/images/slider/slider-img.png" alt="" />
        </div>
      </div>
      <!-- Slider Image Start -->
    </div>
    <!-- Single Slider End -->

    <!-- Single Slider Start -->
    <div class="single-slider bg-cover d-flex align-items-center slider-background">
      <div class="container">
        <!-- Slider Content Start -->
        <div class="slider-content">
          <h3 class="sub-title" data-animation="fadeInDown" data-delay="0.5s">
            Tu salud dental, nuestra prioridad
          </h3>
          <h2 class="title" data-animation="fadeInUp" data-delay="0.7s">
            Expertos en cuidado <br />
            dental de calidad
          </h2>
          <p data-animation="fadeInUp" data-delay="0.9s">
            Combinamos tecnología avanzada y un equipo altamente capacitado para
            ofrecerte tratamientos que garantizan una sonrisa sana y radiante
          </p>
          <a class="btn" href="#odontologos" data-animation="fadeInUp" data-delay="1s">Nuestros doctores</a>
          <a class="btn btn-white" href="" data-animation="fadeInUp" data-delay="1s">Nuestros servicios</a>
        </div>
        <!-- Slider Content End -->
      </div>

      <!-- Slider Image Start -->
      <div class="slider-image">
        <div class="image">
          <img src="@/assets/images/slider/odontologo2-fondo.png" alt="" />
        </div>
      </div>
      <!-- Slider Image Start -->
    </div>
    <!-- Single Slider End -->

    <!-- Single Slider Start -->
    <div class="single-slider bg-cover d-flex align-items-center slider-background">
      <div class="container">
        <!-- Slider Content Start -->
        <div class="slider-content">
          <h3 class="sub-title" data-animation="fadeInDown" data-delay="0.5s">
            Transformamos tu sonrisa
          </h3>
          <h2 class="title" data-animation="fadeInUp" data-delay="0.7s">
            Confianza y cuidado en cada tratamiento
          </h2>
          <p data-animation="fadeInUp" data-delay="0.9s">
            Con un enfoque personalizado, nos comprometemos a cuidar tu salud
            bucal con tratamientos innovadores y profesionales.
          </p>
          <a class="btn" href="#odontologos" data-animation="fadeInUp" data-delay="1s">Nuestros doctores</a>
          <a class="btn btn-white" href="" data-animation="fadeInUp" data-delay="1s">Nuestros servicios</a>
        </div>
        <!-- Slider Content End -->
      </div>

      <!-- Slider Image Start -->
      <div class="slider-image">
        <div class="image">
          <img src="@/assets/images/slider/odontologo3-fondo.png" alt="" />
        </div>
      </div>
      <!-- Slider Image Start -->
    </div>
    <!-- Single Slider End -->
  </div>
  <!-- Slider Section End -->

  <!-- Features Section Start -->
  <div class="section features-area section-padding">
    <div class="container">
      <div class="features-wrapper">
        <!-- Features Content Start -->
        <div class="features-content">
          <div class="row">
            <div class="col-lg-7 col-md-7">
              <div class="features-title">
                <h2 class="title">
                  Cuidando la salud y el bienestar de tu sonrisa y la de tu
                  familia.
                </h2>
                <p>
                  En nuestra clínica dental, combinamos tecnología avanzada y
                  atención personalizada para ofrecerte una experiencia de
                  calidad. Nos comprometemos a cuidar tu sonrisa y a brindarte
                  la confianza que mereces
                </p>
              </div>
            </div>
            <div class="col-lg-5 col-md-5">
              <div class="features-text">
                <p>
                  Nuestro equipo de especialistas trabaja con pasión y
                  dedicación para garantizarte tratamientos efectivos y cómodos.
                  Desde chequeos regulares hasta procedimientos avanzados,
                  estamos contigo en cada paso hacia una sonrisa saludable
                </p>
                <h3 class="name">Dr. Shauna Cusumano.<span>Fundadora</span></h3>
              </div>
            </div>
          </div>
        </div>
        <!-- Features Content End -->

        <!-- Features Icon Wrapper Start -->
        <div class="features-icon-wrapper">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-around">
            <!-- Features Item Start -->
            <div class="col">
              <div class="features-item">
                <div class="features-item-wrapper">
                  <i class="flaticon-health-check"></i>
                  <h4 class="title">Consejos médicos y chequeos</h4>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="features-item">
                <div class="features-item-wrapper">
                  <i class="flaticon-medicine"></i>
                  <h4 class="title">Tratamiento médico de confianza</h4>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="features-item">
                <div class="features-item-wrapper">
                  <i class="flaticon-ambulance"></i>
                  <h4 class="title">Ayuda de emergencia disponible</h4>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="features-item">
                <div class="features-item-wrapper">
                  <i class="flaticon-doctor"></i>
                  <h4 class="title">Solo médicos calificados</h4>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="features-item">
                <div class="features-item-wrapper">
                  <i class="flaticon-microscope"></i>
                  <h4 class="title">
                    Investigación <br />
                    médica
                  </h4>
                </div>
              </div>
            </div>
            <!-- Features Item End -->
          </div>
        </div>
        <!-- Features Icon Wrapper End -->
      </div>
    </div>
  </div>
  <!-- Features Section End -->

  <div class="section about-area section-padding">
    <div class="container">
      <div class="about-wrapper">
        <!-- About Content Start -->
        <div class="row align-items-center">
          <!-- Parte Izquierda: Video de YouTube Short -->
          <div class="col-lg-6 col-md-6">
            <div class="about-video" style="margin-left: -20px">
              <!-- Ajuste hacia la izquierda -->
              <iframe width="100%" height="500" src="https://www.youtube.com/embed/2glNgj9RquU?autoplay=0"
                title="YouTube Shorts player" frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>

          <!-- Parte Derecha: Texto -->
          <div class="col-lg-6 col-md-6">
            <div class="about-text">
              <h2 class="title">
                Totalmente dedicado a su salud médica dental.
              </h2>
              <p>
                La salud bucal es un aspecto fundamental de tu bienestar
                general.

                <br /><br />
                Cuidar y proteger tu boca es fundamental para conservar tu salud
                e higiene dental a lo largo de tu vida. En nuestra Clínica
                Guardo ofrecemos una variedad de tratamientos integrales
                orientados a restablecer la función, la estética y la armonía
                bucal. Priorizando la prevención para evitar problemas en el
                futuro.
              </p>
            </div>
          </div>
        </div>
        <!-- About Content End -->
      </div>
    </div>
  </div>

  <!-- About Section End -->

  <!-- Research Section Start -->
  <div class="section research-area section-padding-02">
    <div class="container">
      <div class="research-wrapper">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <!-- Research Content Start -->
            <div class="research-content-wrapper">
              <div class="section-title research-title">
                <h3 class="sub-title">Especialista Destacado</h3>
                <h2 class="title">Dr. Victoria Jensen</h2>
                <p>
                  Especialista en odontología avanzada con más de 10 años de
                  experiencia en tratamientos estéticos y restaurativos.
                  Comprometida con brindar sonrisas saludables y hermosas a cada
                  paciente.
                </p>
              </div>
              <div class="research-content">
                <h4 class="title">Biografía</h4>
                <p>
                  La Dra. Victoria Jensen es reconocida por su enfoque
                  personalizado y su pasión por la odontología. Graduada con
                  honores en Odontología, ha dedicado su carrera a ofrecer
                  tratamientos innovadores y de calidad. Su especialidad incluye
                  implantes dentales, ortodoncia invisible y blanqueamiento
                  dental.
                </p>
              </div>
            </div>
            <!-- Research Content End -->
          </div>
          <div class="col-lg-6 col-md-6">
            <!-- Research Img Start -->
            <div class="research-img">
              <img src="@/assets/images/research.png" alt="" />
            </div>
            <!-- Research Img End -->
          </div>
        </div>
      </div>
    </div>

    <img class="shape d-none d-md-block" src="@/assets/images/r-shape.png" alt="" />
  </div>
  <!-- Research Section End -->

  <!-- Team Section Start -->
  <div class="section team-area section-padding">
    <div class="container">
      <div class="team-wrapper">
        <!-- Team Title Start -->
        <div class="team-title-wrapper">
          <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-8">
              <div class="section-title">
                <h3 class="sub-title">¡Atención médica y general!</h3>
                <h2 class="title">Conozca a nuestros médicos</h2>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 align-self-end">
              <div class="team-btn">
                <a class="btn" href="">Todos los doctores</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Team Title End -->

        <!-- Team Content Wrapper Start -->
        <div class="team-content-wrapper">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="team-item">
                <!-- Team Img Start -->
                <div class="team-img">
                  <img src="@/assets/images/team/team-1.jpg" alt="" />
                </div>
                <!-- Team Img End -->

                <!-- Team Content Start -->
                <div class="team-content text-center">
                  <ul class="social">
                    <li>
                      <a href="#"><i class="ri-facebook-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-twitter-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-linkedin-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-instagram-fill"></i></a>
                    </li>
                  </ul>
                  <h3 class="name">
                    <a href="">Dr. Jhonny </a>
                  </h3>
                  <h5 class="designation">Oral Surgery</h5>
                  <div class="team-info">
                    <ul>
                      <li>
                        <i class="ri-mail-unread-fill"></i>
                        <span>info@example.com</span>
                      </li>
                      <li><i class="ri-phone-fill"></i> +123 4567 7899</li>
                    </ul>
                  </div>
                </div>
                <!-- Team Content End -->
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="team-item">
                <!-- Team Img Start -->
                <div class="team-img">
                  <img src="@/assets/images/team/team-2.jpg" alt="" />
                </div>
                <!-- Team Img End -->

                <!-- Team Content Start -->
                <div class="team-content text-center">
                  <ul class="social">
                    <li>
                      <a href="#"><i class="ri-facebook-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-twitter-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-linkedin-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-instagram-fill"></i></a>
                    </li>
                  </ul>
                  <h3 class="name">
                    <a href="">Dr. Victoria Jensen</a>
                  </h3>
                  <h5 class="designation">Oral Surgery</h5>
                  <div class="team-info">
                    <ul>
                      <li>
                        <i class="ri-mail-unread-fill"></i>
                        <span>info@example.com</span>
                      </li>
                      <li><i class="ri-phone-fill"></i> +123 4567 7899</li>
                    </ul>
                  </div>
                </div>
                <!-- Team Content End -->
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="team-item">
                <!-- Team Img Start -->
                <div class="team-img">
                  <img src="@/assets/images/team/team-3.jpg" alt="" />
                </div>
                <!-- Team Img End -->

                <!-- Team Content Start -->
                <div class="team-content text-center">
                  <ul class="social">
                    <li>
                      <a href="#"><i class="ri-facebook-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-twitter-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-linkedin-fill"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="ri-instagram-fill"></i></a>
                    </li>
                  </ul>
                  <h3 class="name">
                    <a href="">Dr. Victoria Jensen</a>
                  </h3>
                  <h5 class="designation">Oral Surgery</h5>
                  <div class="team-info">
                    <ul>
                      <li>
                        <i class="ri-mail-unread-fill"></i>
                        <span>info@example.com</span>
                      </li>
                      <li><i class="ri-phone-fill"></i> +123 4567 7899</li>
                    </ul>
                  </div>
                </div>
                <!-- Team Content End -->
              </div>
            </div>
          </div>
        </div>
        <!-- Team Content Wrapper End -->
      </div>
    </div>
  </div>
  <!-- Team Section End -->

  <!-- Service Section Start -->
  <div class="section service-area section-padding">
    <img class="shape d-none d-md-block" src="@/assets/images/s-shape.png" alt="" />
    <div class="container">
      <!-- Service Wrapper Start -->
      <div class="service-wrapper">
        <div class="row justify-content-center">
          <!-- Section Title Start -->
          <div class="col-lg-8">
            <div class="section-title text-center">
              <h3 class="sub-title">Nuestros mejores servicios dentales</h3>
              <h2 class="title">Servicios increíbles</h2>
            </div>
          </div>
          <!-- Section Title End -->
        </div>

        <!-- Service Content Wrapper Start -->
        <div class="service-content-wrapper">
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-1.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Cirugía Oral</a>
                    </h3>
                    <p>
                      Realizamos cirugías orales seguras y avanzadas, como
                      extracciones complejas y tratamientos quirúrgicos, para
                      garantizar tu salud bucal.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-2.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Implantes Dentales</a>
                    </h3>
                    <p>
                      Recupera tu sonrisa con implantes dentales que se ven y
                      sienten como dientes naturales. Una solución duradera y
                      confiable
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-3.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Odontología Familiar</a>
                    </h3>
                    <p>
                      Ofrecemos atención dental integral para toda la familia,
                      desde chequeos regulares hasta limpiezas profundas, en un
                      ambiente cómodo y profesional.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-4.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Ortodoncia</a>
                    </h3>
                    <p>
                      Corrige la alineación de tus dientes con tratamientos
                      modernos como brackets o alineadores invisibles. Consigue
                      una sonrisa perfecta.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-5.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Prótesis Dentales</a>
                    </h3>
                    <p>
                      Recupera tu funcionalidad y estética dental con prótesis
                      diseñadas a medida para ti.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-6.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Odontología Preventiva</a>
                    </h3>
                    <p>
                      Cuidamos tu salud bucal con chequeos regulares y limpiezas
                      profesionales.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-7.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Tratamiento de Caries</a>
                    </h3>
                    <p>
                      Eliminamos caries y restauramos tus dientes para
                      devolverles su salud y fortaleza.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="service-item">
                <!-- Service Img Start -->
                <div class="service-img">
                  <img src="@/assets/images/services/service-8.jpg" alt="" />
                </div>
                <!-- Service Img End -->

                <!-- Service Content Start -->
                <div class="service-content text-center">
                  <i class="flaticon-surgery-room"></i>
                  <div class="service-icon-wrapper">
                    <h3 class="title">
                      <a href="">Blanqueamiento Dental</a>
                    </h3>
                    <p>
                      Ilumina tu sonrisa con nuestro tratamiento profesional de
                      blanqueamiento dental.
                    </p>
                    <a class="read-more" href="#">Leer Más</a>
                  </div>
                </div>
                <!-- Service Content End -->
              </div>
            </div>
          </div>
        </div>
        <!-- Service Content Wrapper End -->

        <!-- Service Button start -->
        <div class="row justify-content-center">
          <div class="service-btn text-center">
            <a class="btn" href="">All Services</a>
          </div>
        </div>
        <!-- Service Button End -->
      </div>
      <!-- Service Wrapper End -->
    </div>
  </div>
  <!-- Service Section End -->

  <!--  Appointment Section Start -->
  <div class="section appointment-area">
    <div class="container">
      <!--  Appointment Wrapper Start -->
      <div class="appointment-wrapper">
        <div class="row">
          <div class="col-lg-5 col-md-5">
            <div class="appointment-content">
              <!--  Appointment Title Start -->
              <div class="section-title appointment-main-title">
                <h3 class="sub-title">Cita</h3>
                <h2 class="title">Pedir hora</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing egestas
                  Phasellus rutrum ante a tortor efficitur, quis tempor tellus.
                  Nunc pulvinar elit vitae sagittis tristique.
                </p>
              </div>
              <!--  Appointment Title End -->

              <!--  Appointment Img Start -->
              <div class="appointment-img">
                <img src="@/assets/images/appointment-img.png" alt="" />
              </div>
              <!--  Appointment Img End -->
            </div>
          </div>
          <div class="col-lg-7 col-md-7">
            <!--  Appointment Form Wrapper Start -->
            <div class="appointment-form-wrapper">
              <!--  Appointment Title Wrapper Start -->
              <div class="appointment-title-wrapper">
                <div class="appointment-title">
                  <h3 class="title">Reservar una cita</h3>
                  <span>Por favor llámenos para asegurarse</span>
                </div>
                <div class="appointment-icon">
                  <i class="ri-phone-fill"></i>
                </div>
              </div>
              <!--  Appointment Title Wrapper End -->

              <!--  Appointment Form Inner Start -->
              <div class="appointment-form-inner">
                <form id="contact-form" action="assets/contact.php" method="post">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="single-form">
                        <select>
                          <option value="0">Select Services</option>
                          <option value="1">Services 01</option>
                          <option value="2">Services 02</option>
                          <option value="3">Services 03</option>
                          <option value="4">Services 04</option>
                          <option value="5">Services 05</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="single-form">
                        <select>
                          <option value="0">Choose Doctor</option>
                          <option value="1">Doctor 01</option>
                          <option value="2">Doctor 02</option>
                          <option value="3">Doctor 03</option>
                          <option value="4">Doctor 04</option>
                          <option value="5">Doctor 05</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="single-form">
                        <input type="text" placeholder="Your Name" />
                        <i class="flaticon-user"></i>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="single-form">
                        <input type="email" placeholder="Email Address" />
                        <i class="flaticon-message"></i>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="single-form">
                        <input type="text" placeholder="Your Phone" />
                        <i class="flaticon-phone-call"></i>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="single-form">
                        <input type="text" id="datepicker" placeholder="Select Date & Time" />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <p class="form-message mt-3 alert-danger"></p>
                    </div>

                    <div class="col-sm-12">
                      <button class="btn" type="submit">Hacer cita</button>
                    </div>
                  </div>
                </form>
              </div>
              <!--  Appointment Form Inner End -->
            </div>
            <!--  Appointment Form Wrapper End -->
          </div>
        </div>
      </div>
      <!--  Appointment Wrapper End -->
    </div>
    <img class="shape d-none d-md-block" src="@/assets/images/r-shape.png" alt="" />
  </div>
  <!--  Appointment Section End -->

  <!--  Result Area Start -->
  <div class="section result-area section-padding-02">
    <div class="container">
      <div class="result-wrapper">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <!--  Result Title Start -->
            <div class="section-title result-title text-center">
              <h2 class="title">Los mejores resultados posibles</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla,
                tempor et ex consequat, dignissim finibus enim.
              </p>
            </div>
            <!--  Result Title End -->
          </div>
        </div>
      </div>
    </div>

    <!--  Result Content Wrapper Start -->
    <div class="result-content-wrapper">
      <div class="result-img d-flex align-items-center bg-cover home-background">
        <div class="container">
          <div class="result-item-wrapper">
            <!--  Result Content Start -->
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="result-content text-center">
                  <h2 class="title">Antes</h2>
                  <p>
                    Antes de la limpieza, los dientes presentan manchas y
                    acumulación de placa, afectando la salud bucal y la estética
                    de la sonrisa.
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="result-content text-center">
                  <h2 class="title">Despues</h2>
                  <p>
                    Después del tratamiento, los dientes lucen más blancos,
                    libres de placa y con un brillo renovado que realza la
                    confianza en tu sonrisa.
                  </p>
                </div>
              </div>
            </div>
            <!--  Result Content End -->
          </div>
        </div>
      </div>
    </div>
    <!--  Result Content Wrapper End -->
  </div>
  <!--  Result Area End -->

  <!--  Testimonial Area Start -->
  <div class="section testimonial-area section-padding">
    <div class="container">
      <div class="testimonial-wrapper">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <!--  Testimonial Title Start -->
            <div class="section-title result-title text-center">
              <h3 class="sub-title">Revisión de nuestros clientes</h3>
              <h2 class="title">Revisión real de nuestro cliente real</h2>
            </div>
            <!--  Testimonial Title End -->
          </div>
        </div>

        <!--  Testimonial Content Wrapper Start -->
        <div class="testimonial-content-wrapper">
          <div class="row-wrapper testimonial-active dot-style">
            <div class="custom-col">
              <div class="single-testimonial">
                <div class="testimonial-content d-flex align-items-center">
                  <div class="testimonial-img">
                    <img src="@/assets/images/testimonial-2.png" alt="" />
                    <i class="flaticon-right-quotation-mark"></i>
                  </div>
                  <div class="testimonial-client">
                    <h3 class="name">Lucas Méndez</h3>
                    <span>Paciente dental</span>
                  </div>
                </div>
                <div class="testimonial-text">
                  <p>
                    La atención fue excelente y muy profesional. Mi sonrisa luce
                    mejor que nunca gracias a su tratamiento
                  </p>
                </div>
              </div>
            </div>
            <div class="custom-col">
              <div class="single-testimonial">
                <div class="testimonial-content d-flex align-items-center">
                  <div class="testimonial-img">
                    <img src="@/assets/images/testimonial-2.png" alt="" />
                    <i class="flaticon-right-quotation-mark"></i>
                  </div>
                  <div class="testimonial-client">
                    <h3 class="name">Lucas Méndez</h3>
                    <span>Paciente dental</span>
                  </div>
                </div>
                <div class="testimonial-text">
                  <p>
                    Estoy realmente satisfecho con los resultados. El equipo fue
                    muy amable y resolvieron todas mis dudas.
                  </p>
                </div>
              </div>
            </div>
            <div class="custom-col">
              <div class="single-testimonial">
                <div class="testimonial-content d-flex align-items-center">
                  <div class="testimonial-img">
                    <img src="@/assets/images/testimonial-2.png" alt="" />
                    <i class="flaticon-right-quotation-mark"></i>
                  </div>
                  <div class="testimonial-client">
                    <h3 class="name">Alejandro Herrera</h3>
                    <span>Dental patient</span>
                  </div>
                </div>
                <div class="testimonial-text">
                  <p>
                    Recomendaría esta clínica a todos. El cuidado y detalle que
                    pusieron en mi tratamiento fue increíble.
                  </p>
                </div>
              </div>
            </div>
            <div class="custom-col">
              <div class="single-testimonial">
                <div class="testimonial-content d-flex align-items-center">
                  <div class="testimonial-img">
                    <img src="@/assets/images/testimonial-2.png" alt="" />
                    <i class="flaticon-right-quotation-mark"></i>
                  </div>
                  <div class="testimonial-client">
                    <h3 class="name">Isabella Martínez</h3>
                    <span>Paciente dental</span>
                  </div>
                </div>
                <div class="testimonial-text">
                  <p>
                    Los resultados superaron mis expectativas. No solo mejoraron
                    mi sonrisa, sino también mi confianza.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  Testimonial Content Wrapper End -->
      </div>
    </div>
  </div>
  <!--  Testimonial Area End -->

  <!-- MAPA DE GOOGLE UBICACION-->
  <div class="container-fluid p-0">
    <!-- Título de la Sección -->
    <div class="row no-gutters">
      <div class="col-12 text-center py-3">
        <h2 class="section-title">NOS UBICAMOS!!</h2>
      </div>
    </div>

    <!-- Mapa de Google Maps -->
    <div class="row no-gutters">
      <div class="col-12">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.3517743557354!2d-65.2600836!3d-19.0482651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93fbcf36656fb06b%3A0x5e4f23584d3c808f!2sPl.%2025%20de%20Mayo%2C%20Sucre!5e0!3m2!1ses-419!2sbo!4v1731473447163!5m2!1ses-419!2sbo"
            style="border: 0; width: 100%; height: 450px" allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
        </div>
      </div>
    </div>
  </div>

  <!--  Blog Area Start -->
  <div class="section blog-area section-padding">
    <div class="container">
      <!--  Blog Wrapper Start -->
      <div class="blog-wrapper">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <!--  Blog Title Start -->
            <div class="section-title blog-title text-center">
              <h2 class="title">Nuestro último blog y noticias</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla,
                tempor et ex consequat, dignissim finibus enim.
              </p>
            </div>
            <!--  Blog Title End -->
          </div>
        </div>

        <!--  Blog Content Wrapper Start -->
        <div class="blog-content-wrapper">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="blog-item">
                <!--  Blog Img Start -->
                <div class="blog-img">
                  <a href=""><img src="" alt="" /></a>
                </div>
                <!--  Blog Img End -->

                <!--  Blog Content Start -->
                <div class="blog-content">
                  <ul class="blog-meta">
                    <li>
                      <a href="#"><i class="flaticon-add-user"></i> By Doctor</a>
                    </li>
                    <li>
                      <a href="#"><i class="flaticon-calendar"></i> 17 June 2021</a>
                    </li>
                  </ul>
                  <h3 class="title">
                    <a href="#">Revise su historial familiar</a>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipi tempor et ex
                    consequat, dignissim
                  </p>
                  <a class="btn" href="">Read More</a>
                </div>
                <!--  Blog Content End -->
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="blog-item">
                <!--  Blog Img Start -->
                <div class="blog-img">
                  <a href=""><img src="" alt="" /></a>
                </div>
                <!--  Blog Img End -->

                <!--  Blog Content Start -->
                <div class="blog-content">
                  <ul class="blog-meta">
                    <li>
                      <a href="#"><i class="flaticon-add-user"></i> Por el doctor</a>
                    </li>
                    <li>
                      <a href="#"><i class="flaticon-calendar"></i> 17 June 2021</a>
                    </li>
                  </ul>
                  <h3 class="title">
                    <a href="#">Revise su historial familiar</a>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipi tempor et ex
                    consequat, dignissim
                  </p>
                  <a class="btn" href="">Read More</a>
                </div>
                <!--  Blog Content End -->
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="blog-item">
                <!--  Blog Img Start -->
                <div class="blog-img">
                  <a href=""><img src="" alt="" /></a>
                </div>
                <!--  Blog Img End -->

                <!--  Blog Content Start -->
                <div class="blog-content">
                  <ul class="blog-meta">
                    <li>
                      <a href="#"><i class="flaticon-add-user"></i> Por el doctor</a>
                    </li>
                    <li>
                      <a href="#"><i class="flaticon-calendar"></i> 17 June 2021</a>
                    </li>
                  </ul>
                  <h3 class="title">
                    <a href="#">Revise su historial familiar</a>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipi tempor et ex
                    consequat, dignissim
                  </p>
                  <a class="btn" href="">Read More</a>
                </div>
                <!--  Blog Content End -->
              </div>
            </div>
          </div>
        </div>
        <!--  Blog Content Wrapper End -->
      </div>
      <!--  Blog Wrapper End -->
    </div>
  </div>
  <!--  Blog Area End -->

  <!--  Subscribe Area Start -->
  <div class="section subscribe-area">
    <div class="container">
      <div class="subscribe-wrapper">
        <div class="row">
          <div class="col-lg-9 col-md-8 col-sm-8">
            <!--  Subscribe Form Start -->
            <div class="subscribe-form">
              <form>
                <input type="email" placeholder="Enter Your Email Address" />
                <i class="ri-mail-unread-fill"></i>
              </form>
            </div>
            <!--  Subscribe Form End -->
          </div>
          <div class="col-lg-3 col-md-4 col-sm-4">
            <!--  Subscribe Button Start -->
            <div class="subscribe-btn">
              <button class="btn" type="submit">Suscribir</button>
            </div>
            <!--  Subscribe Button End -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  Subscribe Area End -->
</template>

<style scoped>
/* Agrega el estilo de fondo usando una clase específica */
.slider-background {
  background-image: url('@/assets/images/slider/slider-1.png');
}

.slider2-background {
  background-image: url('@/assets/images/slider/slider-img-2.png');
}

.home-background {
  background-image: url('@/assets/images/result.png');
}

.about-video iframe {
  border-radius: 10px;
  /* Bordes redondeados opcionales */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Sombras para darle más estilo */
}

.map-container {
  border: 2px solid #0d6efd;
  /* Color del borde */
  border-radius: 10px;
  /* Bordes redondeados */
  overflow: hidden;
  /* Para que el iframe no sobresalga de los bordes redondeados */
  padding: 5px;
  /* Espaciado entre el marco y el iframe (opcional) */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* Sombra para darle profundidad */
}

iframe {
  border: none;
  /* Asegúrate de que el iframe no tenga su propio borde */
}
</style>
