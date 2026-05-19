package demo

import com.thoughtworks.xstream.XStream
import javax.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping

class XStreamImport {
    @GetMapping("/kotlin/xstream/import")
    fun importXml(request: HttpServletRequest): Any {
        val xml = request.getParameter("xml")
        return parseXml(xml)
    }

    private fun parseXml(xml: String): Any {
        return XStream().fromXML(xml)
    }
}
