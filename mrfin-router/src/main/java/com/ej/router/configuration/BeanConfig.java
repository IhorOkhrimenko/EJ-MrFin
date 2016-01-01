package com.ej.router.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Configuration class for Bean.
 */
@Configuration
@EnableWebMvc
@PropertySource({"classpath:/application.properties"})
@ComponentScan({
        "com.ej.router.controller",
        "com.ej.router.dao",
        "com.ej.router.domain",
        "com.ej.router.services",
        "com.ej.api"
})
public class BeanConfig {
}
