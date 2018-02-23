package com.learn.java8.lambda.constant;

import com.learn.java8.lambda.bean.Apple;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/12/28 0028.
 */
public class Constant {
    public static final List<Apple> APPLES = new ArrayList<>();
    public static final String[] colors = new String[]{"红", "黄", "绿"};

    static {
        for (int i = 0; i < 10; i++) {
            Apple apple = Apple.builder()
                    .color(colors[i % 3])
                    .Height(i * 3)
                    .Width(i * 2)
                    .build();
            APPLES.add(apple);
        }
    }
}
