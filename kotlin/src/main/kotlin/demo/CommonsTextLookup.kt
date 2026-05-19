package demo

import javax.servlet.http.HttpServletRequest
import org.apache.commons.text.StringSubstitutor
import org.springframework.web.bind.annotation.GetMapping

class CommonsTextLookup {
    @GetMapping("/kotlin/commons-text/lookup")
    fun render(request: HttpServletRequest): String {
        val template = request.getParameter("template")
        return renderTemplate(template)
    }

    private fun renderTemplate(template: String): String {
        return StringSubstitutor.createInterpolator().replace(template)
    }
}
