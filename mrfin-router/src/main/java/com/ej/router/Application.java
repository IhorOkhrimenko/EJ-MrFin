package com.ej.router;

import com.ej.router.configuration.BeanConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.test.context.ContextConfiguration;

/**
 * Application configuration.
 */
@SpringBootApplication
@ContextConfiguration(classes = {BeanConfig.class})
public class Application extends SpringBootServletInitializer {
    /**
     * The main method.
     *
     * @param args The list of argument.
     */
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication();
        application.setWebEnvironment(false);
        application.run(Application.class, args);
    }
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

}
