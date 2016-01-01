package com.ej.sh1rk;

import com.ej.sh1rk.validator.Validator;
import org.junit.Test;

import java.io.File;

/**
 * Test class for the {@code Validator} class, namely it`s JSON part.
 *
 * @auhor Igor Okhrimenko
 */
public class ValidatorJsonTest {
    private static String[] args;

    private String getFilePath(String fileName) {
        String filepath = new File("").getAbsolutePath() + File.separator
                + "src" + File.separator + "test" + File.separator +
                "resources" + File.separator + fileName;
        return filepath;
    }

    @Test
    public void validateJsonOkTest() {
        String fileName = "work.json";
        String filepath = getFilePath(fileName);
        args = new String[]{"validate", filepath};
        Validator.main(args);
    }

    @Test
    public void validateJsonFailureTest() {
        String fileName = "failure.json";
        String filepath = getFilePath(fileName);
        args = new String[]{"validate", filepath};
        Validator.main(args);
    }

    @Test
    public void validateSmallFileTest() {
        String fileName = "ispretty.json";
        String filepath = getFilePath(fileName);
        args = new String[]{"validate", filepath};
        Validator.main(args);
    }

    @Test
    public void validateFewArgTest() {
        args = new String[]{"validate"};
        Validator.main(args);
    }
}
