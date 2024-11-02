<script setup lang="ts"></script>

<template>
  <div>
    <!-- Header Section Start -->
    <div class="section header-section transparent-header">
      <!-- Header Top Start -->
      <div class="header-top d-none d-lg-block">
        <div class="container">
          <!-- Header Top Wrapper Start -->
          <div class="header-top-wrapper">
            <!-- Header Info Start  -->
            <div class="header-top-info">
              <ul>
                <li>
                  <i class="ri-map-pin-add-line"></i>
                  <span>751 North Berkshire Rd. Auburndale</span>
                </li>
                <li>
                  <i class="ri-mail-unread-fill"></i>
                  <span>info@example.com</span>
                </li>
                <li><i class="ri-phone-fill"></i> +123 4567 7899</li>
              </ul>
            </div>
            <!-- Header Info End -->

            <!-- Header Social Start -->
            <div class="header-social">
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
            </div>
            <!-- Header Social End -->
          </div>
          <!-- Header Top Wrapper End -->
        </div>
      </div>
      <!-- Header Top End -->

      <!-- Header Bottom Start -->
      <div class="header-bottom">
        <div class="container">
          <!-- Header Bottom Wrapper Start -->
          <div class="header-bottom-wrapper">
            <!-- Header Logo Start -->
            <div class="header-logo">
              <a href="index.html"
                ><img src="@/assets/images/logo.png" alt="Logo"
              /></a>
            </div>
            <!-- Header logo End -->

            <!-- Header Primary Menu Start -->
            <div class="header-primary-menu d-none d-lg-block">
              <ul class="nav-menu">
                <li>
                  <a class="active" href="index.html">Home</a>
                  <ul class="sub-menu">
                    <li><a class="active" href="index.html">Home 01</a></li>
                  </ul>
                </li>
                <li><a href="about.html">About</a></li>
                <li><a href="doctor.html">Doctors</a></li>
                <li>
                  <a href="blog.html">Blog</a>
                  <ul class="sub-menu">
                    <li><a href="blog.html">Blog 3 Column</a></li>
                    <li><a href="blog-standard.html">Blog Standard</a></li>
                    <li><a href="blog-details.html">Blog Details</a></li>
                  </ul>
                </li>
                <li>
                  <a href="service.html">Pages</a>
                  <ul class="sub-menu">
                    <li><a href="service.html">Services</a></li>
                    <li><a href="appoinment.html">Appoinment</a></li>
                  </ul>
                </li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <!-- Header Primary Menu End -->

            <!-- Header Button Start -->
            <div class="header-btn d-none d-lg-block">
              <a class="btn" href="appoinment.html">Make Appointment</a>
            </div>
            <!-- Header Button End -->

            <!-- Header Mobile Toggle Start -->
            <div class="header-toggle d-lg-none">
              <button
                class="menu-toggle"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <!-- Header Mobile Toggle End -->
          </div>
          <!-- Header Bottom Wrapper End -->
        </div>
      </div>
      <!-- Header Bottom End -->
    </div>
    <!-- Header Section End -->

    <!-- Mobile Menu End -->
    <div class="offcanvas offcanvas-start" id="offcanvasMenu">
      <div class="offcanvas-header">
        <a class="logo" href="#"
          ><img src="@/assets/images/logo.png" alt="Logo"
        /></a>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body">
        <!-- Header Info Start  -->
        <div class="header-top-info">
          <ul>
            <li>
              <i class="ri-map-pin-add-line"></i>
              <span>751 North Berkshire Rd. Auburndale</span>
            </li>
            <li>
              <i class="ri-mail-unread-fill"></i> <span>info@example.com</span>
            </li>
            <li><i class="ri-phone-fill"></i> +123 4567 7899</li>
          </ul>
        </div>
        <!-- Header Info End -->

        <!-- Header Social Start -->
        <div class="header-social">
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
        </div>
        <!-- Header Social End -->

        <div class="mobile-menu">
          <ul class="nav-menu">
            <li>
              <a class="active" href="index.html">Home</a>
              <ul class="sub-menu">
                <li><a href="index.html">Home 01</a></li>
                <li><a href="index-2.html">Home 02</a></li>
              </ul>
            </li>
            <li><a href="about.html">About</a></li>
            <li><a href="doctor.html">Doctors</a></li>
            <li>
              <a href="blog.html">Blog</a>
              <ul class="sub-menu">
                <li><a href="blog.html">Blog 3 Column</a></li>
                <li><a href="blog-standard.html">Blog Standard</a></li>
                <li><a href="blog-details.html">Blog Details</a></li>
              </ul>
            </li>
            <li>
              <a href="service.html">Pages</a>
              <ul class="sub-menu">
                <li><a href="service.html">Services</a></li>
                <li><a href="appoinment.html">Appoinment</a></li>
              </ul>
            </li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Mobile Menu End -->
  </div>
</template>

<style></style>
