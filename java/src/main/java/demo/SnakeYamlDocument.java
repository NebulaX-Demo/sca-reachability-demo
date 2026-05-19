package demo;

import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.yaml.snakeyaml.Yaml;

public final class SnakeYamlDocument {
  @GetMapping("/java/snakeyaml/document")
  public Object parse(HttpServletRequest request) {
    String document = request.getParameter("document");
    return parseDocument(document);
  }

  private Object parseDocument(String document) {
    return new Yaml().load(document);
  }
}
