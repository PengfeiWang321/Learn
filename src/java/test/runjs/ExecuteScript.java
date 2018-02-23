package runjs;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.FileReader;

/**
 * Created by Administrator on 2018/1/19 0019.
 */
public class ExecuteScript {
    public static void main(String[] args) {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("js");
        try {
            String path = ExecuteScript.class.getResource("/").getPath();
            System.out.println(path);
            // FileReader的参数为所要执行的js文件的路径
            engine.eval(new FileReader(path + "JavaScriptMethods.js"));
            if (engine instanceof Invocable) {
                Invocable invocable = (Invocable) engine;
                Methods executeMethod = invocable.getInterface(Methods.class);
                executeMethod.execute("a", "{}");
                executeMethod.execute("a.b", "1");
                executeMethod.execute("a.c", "2");
                executeMethod.execute("a.d", "[]");
                executeMethod.execute("a.d[0]", "3");
                executeMethod.execute("a.d[1]", "4");
                System.out.println(executeMethod.print("a"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
