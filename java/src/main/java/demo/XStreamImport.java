package demo;

import com.thoughtworks.xstream.XStream;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;

public final class XStreamImport {
  @GetMapping("/java/xstream/import")
  public Object importXml(HttpServletRequest request) {
    String xml = request.getParameter("xml");
    return parseXml(xml);
  }

  private Object parseXml(String xml) {
    return new XStream().fromXML(xml);
  }
}
