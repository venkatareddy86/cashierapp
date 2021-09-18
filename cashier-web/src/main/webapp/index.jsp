<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ page import="java.util.*" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<script type="text/javascript">
    var requestData = {};
<%
    Enumeration paramNames = request.getParameterNames();
    while (paramNames.hasMoreElements()) {
	String paramName = (String)paramNames.nextElement();
%>
        requestData['<%=paramName%>']= '<%=request.getParameter(paramName)%>';
<%}%>
</script>
<%@ include file="index.html" %>