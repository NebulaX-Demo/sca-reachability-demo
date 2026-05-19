package demo

import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.yaml.snakeyaml.Yaml

class SnakeYamlDocument {
    @GetMapping("/kotlin/snakeyaml/document")
    fun parse(request: HttpServletRequest): Any {
        val document = request.getParameter("document")
        return parseDocument(document)
    }

    private fun parseDocument(document: String): Any {
        return Yaml().load(document)
    }
}
