package com.learn.java8.lambda.bean;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
 * Created by Administrator on 2017/12/28 0028.
 */
@Data
@Builder
@ToString
public class Apple {
    private String color;
    private int Width;
    private int Height;

    public static void printApples(List apples) {
        apples.forEach(apple -> {
            System.out.println(apple.toString());
        });
    }
}
