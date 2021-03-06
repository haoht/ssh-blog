package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by IntelliJ IDEA.
 * User : 51103942@qq.com
 * Date : 2018/1/4
 * Time : 15:57
 * Talk is cheap. Show me the code.
 */
@Controller
@RequestMapping(value = "/home")
public class HomeController {

    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String toIndex(){
        return "index";
    }

    @RequestMapping(value = "/home",method = RequestMethod.GET)
    public String toHome(){
        return "home";
    }

    @RequestMapping(value = "/about",method = RequestMethod.GET)
    public String toAbout(){
        return "about";
    }

    @RequestMapping(value = "/categories",method = RequestMethod.GET)
    public String toCategories(){
        return "categories";
    }

    @RequestMapping(value = "/blog",method = RequestMethod.GET)
    public String toBlog(){
        return "blog";
    }

    @RequestMapping(value = "/lockScreen",method = RequestMethod.GET)
    public String toLockScreen(){
        return "lockScreen";
    }
}
