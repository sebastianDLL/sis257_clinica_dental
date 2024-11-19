<template>
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
</template>

<style></style>