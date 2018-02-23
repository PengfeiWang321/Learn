package xml;

import org.apkinfo.api.util.AXmlResourceParser;
import org.apkinfo.api.util.XmlPullParser;
import org.apkinfo.api.util.TypedValue;
import org.apkinfo.api.util.XmlPullParserException;

import java.io.*;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * @author 周乐乐
 * 创建时间：2016-12-30 9：51
 * 创建原因：提取apk版本号工具类
 */
public class ApkUtil {
    private  final float RADIX_MULTS[] = { 0.00390625F, 3.051758E-005F,
            1.192093E-007F, 4.656613E-010F };
    private  final String DIMENSION_UNITS[] = { "px", "dip", "sp", "pt", "in", "mm", "", "" };
    private  final String FRACTION_UNITS[] = { "%", "%p", "", "", "", "", "", "" };
    private  String getAttributeValue(AXmlResourceParser parser, int index) {
        int type = parser.getAttributeValueType(index);
        int data = parser.getAttributeValueData(index);
        if (type == TypedValue.TYPE_STRING) {
            return parser.getAttributeValue(index);
        }
        if (type == TypedValue.TYPE_ATTRIBUTE) {
            return String.format("?%s%08X", getPackage(data), data);
        }
        if (type == TypedValue.TYPE_REFERENCE){
            return String.format("@%s%08X", getPackage(data), data);
        }
        if (type == TypedValue.TYPE_FLOAT) {
            return String.valueOf(Float.intBitsToFloat(data));
        }
        if (type == TypedValue.TYPE_INT_HEX) {
            return String.format("0x%08X", data);
        }
        if (type == TypedValue.TYPE_INT_BOOLEAN) {
            return data != 0 ? "true" : "false";
        }
        if (type == TypedValue.TYPE_DIMENSION) {
            return Float.toString(complexToFloat(data))
                    + DIMENSION_UNITS[data & TypedValue.COMPLEX_UNIT_MASK];
        }
        if (type == TypedValue.TYPE_FRACTION) {
            return Float.toString(complexToFloat(data))
                    + FRACTION_UNITS[data & TypedValue.COMPLEX_UNIT_MASK];
        }
        if (type >= TypedValue.TYPE_FIRST_COLOR_INT
                && type <= TypedValue.TYPE_LAST_COLOR_INT) {
            return  String.format("#%08X", data);
        }
        if (type >= TypedValue.TYPE_FIRST_INT
                && type <= TypedValue.TYPE_LAST_INT) {
            return String.valueOf(data);
        }
        return String.format("<0x%X, type 0x%02X>", data, type);
    }
    private  String getPackage(int id) {
        if (id >>> 24 == 1){
            return "android:";
        }
        return "";
    }
    private  float complexToFloat(int complex) {
        return (float) (complex & 0xFFFFFF00) * RADIX_MULTS[(complex >> 4) & 3];
    }
    private  String getCode(InputStream is) throws Exception {
        String versionCode = null;
        String versionName = null;
        try {
            AXmlResourceParser parser = new AXmlResourceParser();
            parser.open(is);
            boolean brek = false;
            while (true) {
                int type = parser.next();
                if (type == XmlPullParser.END_DOCUMENT) {
                    break;
                }
                switch (type) {
                    case XmlPullParser.START_TAG:
                        for (int i = 0; i != parser.getAttributeCount(); ++i) {
                            if ("versionName".equals(parser.getAttributeName(i))) {
                                versionName = getAttributeValue(parser, i);
                                if(versionCode != null) {
                                    brek = true;
                                    break;
                                }
                            }
                            if ("versionCode".equals(parser.getAttributeName(i))) {
                                versionCode = getAttributeValue(parser, i);
                                if(versionName != null) {
                                    brek = true;
                                    break;
                                }
                            }
                        }
                }
                if (brek) {
                    break;
                }
            }

        } catch (Exception e) {
            throw e;
        }
        versionCode = versionName+"."+versionCode;
        return versionCode;
    }

    public  String getVersionCode(String filePath) throws Exception {
        String versionCode = null;
        ZipFile zip = null;
        try{
            File file = new File(filePath);
            zip = new ZipFile(file);
            Enumeration enume = zip.entries();
            String filename = null;
            ZipEntry zipEntry = null;
            while (enume.hasMoreElements()) {
                zipEntry = (ZipEntry)enume.nextElement();
                filename = zipEntry.getName();
                if ("AndroidManifest.xml".equalsIgnoreCase(filename)) {
                    versionCode = getCode(zip.getInputStream(zipEntry));
                    break;
                }
            }
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                if (null != zip) {
                    zip.close();
                }
            } catch (Exception e) {
            }

        }
        return  versionCode;
    }

    public  String getPackageName(String filePath) throws Exception {
        String packageName = null;
        ZipFile zip = null;
        try{
            File file = new File(filePath);
            zip = new ZipFile(file);
            Enumeration enume = zip.entries();
            String filename = null;
            ZipEntry zipEntry = null;
            while (enume.hasMoreElements()) {
                zipEntry = (ZipEntry)enume.nextElement();
                filename = zipEntry.getName();
                if ("AndroidManifest.xml".equalsIgnoreCase(filename)) {
                    packageName = getPackName(zip.getInputStream(zipEntry));
                    break;
                }
            }
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                if (null != zip) {
                    zip.close();
                }
            } catch (Exception e) {
            }

        }
        return  packageName;
    }

    private String getPackName(InputStream inputStream) throws IOException, XmlPullParserException {
        String packageName = null;
        try {
            AXmlResourceParser parser = new AXmlResourceParser();
            parser.open(inputStream);
            boolean brek = false;
            while (true) {
                int type = parser.next();
                if (type == XmlPullParser.END_DOCUMENT) {
                    break;
                }
                switch (type) {
                    case XmlPullParser.START_TAG:
                        for (int i = 0; i != parser.getAttributeCount(); ++i) {
                            if ("package".equals(parser.getAttributeName(i))) {
                                packageName = getAttributeValue(parser, i);
                                brek = true;
                                break;
                            }
                        }
                }
                if (brek) {
                    break;
                }
            }

        } catch (Exception e) {
            throw e;
        }
        return packageName;
    }

    /**
     * @param in 输入文件
     * @param out 输出文件
     */
    public void transferFile(File in, File out) {
        FileOutputStream fileOutputStream = null;
        InputStream inputStream = null;
        byte[] bytes = new byte[1024];
        int temp = 0;
        try {
            fileOutputStream = new FileOutputStream(out);
            inputStream = new FileInputStream(in);
            while ((temp = inputStream.read(bytes)) != -1) {
                fileOutputStream.write(bytes, 0, temp);
                fileOutputStream.flush();
            }
        } catch (IOException e) {
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                }
            }
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                }
            }
        }
    }
    /**
     * 比较版本号的大小,前者大则返回一个正数,后者大返回一个负数,相等则返回0
     * @param version1
     * @param version2
     * @return
     */
    public static int compareVersion(String version1, String version2) throws Exception {
        if (version1 == null || version2 == null) {
            throw new Exception("compareVersion error:illegal params.");
        }
        String[] versionArray1 = version1.toUpperCase().split("\\.");//注意此处为正则匹配，不能用"."；
        String[] versionArray2 = version2.toUpperCase().split("\\.");
        int idx = 0;
        int minLength = Math.min(versionArray1.length, versionArray2.length);//取最小长度值
        int diff = 0;
        while (idx < minLength
                && (diff = versionArray1[idx].length() - versionArray2[idx].length()) == 0//先比较长度
                && (diff = versionArray1[idx].compareTo(versionArray2[idx])) == 0) {//再比较字符
            ++idx;
        }
        //如果已经分出大小，则直接返回，如果未分出大小，则再比较位数，有子版本的为大；
        diff = (diff != 0) ? diff : versionArray1.length - versionArray2.length;
        return diff;
    }

    public void xmlPrint(InputStream inputStream) throws Exception {
        ApkUtil apkUtil = new ApkUtil();
        String apkVersion = apkUtil.getCode(inputStream).toUpperCase();
        String apkPackage = apkUtil.getPackName(inputStream);
        System.out.println(apkVersion);
        System.out.println(apkPackage);
    }
    public void apkPrint(String filePath) throws Exception {
        ApkUtil apkUtil = new ApkUtil();
        String apkVersion = apkUtil.getVersionCode(filePath);
        String apkPackage = apkUtil.getPackageName(filePath);
        System.out.println(apkVersion);
        System.out.println(apkPackage);
    }
    public static void main(String[] args) throws Exception {
        ApkUtil apkUtil = new ApkUtil();
        String path = ApkUtil.class.getResource("/").getPath();
        String xml1 = path + "AndroidManifest_normal.xml";
        String xml2 = path + "AndroidManifest.xml";
        String apk1 = path + "weixin663android1260.apk";
        String apk2 = path + "portservice.apk";
        InputStream inputStream1 = new FileInputStream(new File(xml1));
        InputStream inputStream2 = new FileInputStream(new File(xml2));
        apkUtil.xmlPrint(inputStream1);
        apkUtil.xmlPrint(inputStream2);
        apkUtil.apkPrint(apk1);
        apkUtil.apkPrint(apk2);
    }
}
