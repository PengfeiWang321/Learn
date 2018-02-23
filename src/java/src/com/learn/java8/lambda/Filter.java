package com.learn.java8.lambda;

import com.learn.java8.lambda.bean.Apple;
import com.learn.java8.lambda.constant.Constant;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/12/28 0028.
 */
public class Filter {
    public static boolean isGreenApple(Apple apple) {
        return "绿".equals(apple.getColor());
    }

    public static boolean isHeavyApple(Apple apple) {
        return apple.getHeight() > 15 || apple.getWidth() > 15;
    }

    public static List<Apple> filterApples(List<Apple> source, Predicate<Apple> p) {
        List<Apple> result = new ArrayList<>();
        for (Apple apple : source) {
            if (p.test(apple)) {
                result.add(apple);
            }
        }
        return result;
    }

    public interface Predicate<T> {
        boolean test(T t);
    }

    public static void main(String args[]) {
        List<Apple> apples = Constant.APPLES;
        System.out.println("原数组");
        Apple.printApples(apples);
        //写法1
        List<Apple> fliterResult1 = filterApples(apples, Filter::isGreenApple);
        //写法2
//        List<Apple> fliterResult1 = filterApples(apples, (Apple a) -> "绿".equals(a.getColor()));
        List<Apple> fliterResult2 = filterApples(apples, Filter::isHeavyApple);
        System.out.println("过滤结果1");
        Apple.printApples(fliterResult1);
        System.out.println("过滤结果2");
        Apple.printApples(fliterResult2);
    }
}
