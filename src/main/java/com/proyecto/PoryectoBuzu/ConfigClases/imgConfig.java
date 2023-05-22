package com.proyecto.PoryectoBuzu.ConfigClases;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class imgConfig implements WebMvcConfigurer {

 @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry){
      WebMvcConfigurer.super.addResourceHandlers(registry);

      registry.addResourceHandler("/recursos/**").addResourceLocations("file:/C:/Empleados/recursos/");

     registry.addResourceHandler("/recursitos/**").addResourceLocations("file:/C:/Productos/recursitos/");

  }
}
