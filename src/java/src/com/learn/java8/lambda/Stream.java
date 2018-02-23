package com.learn.java8.lambda;

import com.learn.java8.lambda.bean.Apple;
import com.learn.java8.lambda.constant.Constant;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Administrator on 2017/12/28 0028.
 */
public class Stream {
    public static void main(String args[]) {
        List<Apple> apples = Constant.APPLES;
        System.out.println("原数组");
        Apple.printApples(apples);
        List<Apple> fliterResult1 = apples.stream()
                .filter((Apple apple) ->
                        "红".equals(apple.getColor()) && (apple.getHeight() > 5 || apple.getWidth() > 5))
                .collect(Collectors.toList());
        System.out.println("过滤结果");
        Apple.printApples(fliterResult1);
    }
}
