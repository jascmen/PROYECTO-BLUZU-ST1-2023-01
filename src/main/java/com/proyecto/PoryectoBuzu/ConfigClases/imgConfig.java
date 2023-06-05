package com.proyecto.PoryectoBuzu.ConfigClases;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class imgConfig implements WebMvcConfigurer {

 @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry){
      WebMvcConfigurer.super.addResourceHandlers(registry);


     registry.addResourceHandler("/empleados/**").addResourceLocations("file:images/Empleados/");

     registry.addResourceHandler("/servicios/**").addResourceLocations("file:images/Servicios/");

     registry.addResourceHandler("/productos/**").addResourceLocations("file:images/Productos/");

  }
}
