package demo;

import javax.servlet.http.HttpServletRequest;
import org.apache.commons.text.StringSubstitutor;
import org.springframework.web.bind.annotation.GetMapping;

public final class CommonsTextLookup {
  @GetMapping("/java/commons-text/lookup")
  public String render(HttpServletRequest request) {
    String template = request.getParameter("template");
    return renderTemplate(template);
  }

  private String renderTemplate(String template) {
    return StringSubstitutor.createInterpolator().replace(template);
  }
}
