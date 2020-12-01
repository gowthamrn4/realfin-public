def get_attendance_details(employee,status,start_date,end_date,initial_check,employee_list):
    attendances_obj = []
    try:
        if start_date:
            alldates = [start_date]
            attendance_obj = Attendance.objects.all()
            status_obj = AttendanceStatus.objects.filter(name = 'Unmarked').first()
            filter_user = []
            # for i in range(delta.days + 1):
            #     day = sdate + timedelta(days=i)
            #     alldates.append(str(day))
            for days in alldates:
                for user in employee_list:
                    filter_user_obj = {}
                    filter_user_obj['date'] = str(days)
                    filter_user_obj['user_id'] = str(user.id)           
                    filter_user_obj['user'] = str(user)           
                    filter_user.append(filter_user_obj)  
            if int(employee) == -1 and int(status) > 0:
                check_attedance_status = AttendanceStatus.objects.filter(pk = status).first()
                if check_attedance_status and check_attedance_status.name == 'Unmarked':  
                    for user in filter_user:
                        get_users = HCMSUser.objects.filter(pk = user['user_id']).first()
                        check_attedance = Attendance.objects.filter(employee = get_users,date = user['date']).first()
                        if not check_attedance:
                            date = datetime.strptime(user['date'],"%Y-%m-%d").date()
                            name = str(get_users) + " (" + str(get_users.employee_code) + ")"
                            get_obj = get_attendance_obj(name,user['user_id'],status_obj.name,None,date,None,None,"00:00",None)
                            attendances_obj.append(get_obj)
                        check_attedance_unmark = Attendance.objects.filter(employee = get_users,date = user['date'],status = status_obj) 
                        if check_attedance_unmark:
                           for check_attendance_obj in check_attedance_unmark:
                               if check_attendance_obj:
                                  date = datetime.strptime(user['date'],"%Y-%m-%d").date()
                                  name = str(check_attendance_obj.employee) + " (" + str(check_attendance_obj.employee.employee_code) + ")"
                                  get_obj = get_attendance_obj(name,check_attendance_obj.employee.id,check_attendance_obj.status.name,check_attendance_obj.id,date,check_attendance_obj.check_in,check_attendance_obj.check_out,check_attendance_obj.total_hours,check_attendance_obj.mark_lop)
                                  attendances_obj.append(get_obj)
                elif check_attedance_status and check_attedance_status.name == 'Marked' or check_attedance_status.name == 'Pending':
                    for user in filter_user:
                        get_users = HCMSUser.objects.filter(pk = user['user_id']).first()
                        check_attedance = Attendance.objects.filter(employee = get_users,date = user['date'],status = check_attedance_status)
                        if check_attedance:
                            for check_attendance_obj in check_attedance:
                                date = datetime.strptime(user['date'],"%Y-%m-%d").date()
                                name = str(check_attendance_obj.employee) + " (" + str(check_attendance_obj.employee.employee_code) + ")"
                                get_obj = get_attendance_obj(name,check_attendance_obj.employee.id,check_attendance_obj.status.name,check_attendance_obj.id,date,check_attendance_obj.check_in,check_attendance_obj.check_out,check_attendance_obj.total_hours,check_attendance_obj.mark_lop)
                                attendances_obj.append(get_obj)
            elif int(employee) == -1:
                for user in filter_user:
                    get_users = HCMSUser.objects.filter(pk = user['user_id']).first()
                    check_attedance = Attendance.objects.filter(employee = get_users,date = user['date'])
                    if check_attedance:
                       for check_attendance_obj in check_attedance:
                            date = datetime.strptime(user['date'],"%Y-%m-%d").date()
                            name = str(check_attendance_obj.employee) + " (" + str(check_attendance_obj.employee.employee_code) + ")"            
                            get_obj = get_attendance_obj(name,check_attendance_obj.employee.id,check_attendance_obj.status.name,check_attendance_obj.id,date,check_attendance_obj.check_in,check_attendance_obj.check_out,check_attendance_obj.total_hours,check_attendance_obj.mark_lop)
                            attendances_obj.append(get_obj)
                    else:
                        date = datetime.strptime(user['date'],"%Y-%m-%d").date()
                        name = str(get_users) + " (" + str(get_users.employee_code) + ")"
                        get_obj = get_attendance_obj(name,user['user_id'],status_obj.name,None,date,None,None,"00:00",None)
                        attendances_obj.append(get_obj)
            if int(employee) > 0:
               if int(employee) > 0 and int(status) > 0:
                  get_users = HCMSUser.objects.filter(pk = int(employee)).first()
                  status_obj = AttendanceStatus.objects.filter(pk = status).first()
                  if status_obj and status_obj.name == 'Marked' or status_obj.name == 'Pending':
                     check_attedance = Attendance.objects.filter(employee = get_users, date = start_date, status = status_obj)
                     if check_attedance:
                        for check_attendance_obj in check_attedance:
                            date = check_attendance_obj.date
                            name = str(check_attendance_obj.employee) + " (" + str(check_attendance_obj.employee.employee_code) + ")"            
                            get_obj = get_attendance_obj(name,check_attendance_obj.employee.id,check_attendance_obj.status.name,check_attendance_obj.id,date,check_attendance_obj.check_in,check_attendance_obj.check_out,check_attendance_obj.total_hours,check_attendance_obj.mark_lop)
                            attendances_obj.append(get_obj)
                  elif status_obj and status_obj.name == 'Unmarked':
                       check_attedance = Attendance.objects.filter(employee = get_users, date = start_date).first()
                       if not check_attedance:
                          date = start_date
                          name = str(get_users) + " (" + str(get_users.employee_code) + ")"
                          get_obj = get_attendance_obj(name,get_users.id,status_obj.name,None,date,None,None,"00:00",None)
                          attendances_obj.append(get_obj)
                       check_attedance_unmark = Attendance.objects.filter(employee = get_users,date = start_date,status = status_obj) 
                       if check_attedance_unmark:
                           for check_attendance_obj in check_attedance_unmark:
                               if check_attendance_obj:
                                  date = check_attendance_obj.date
                                  name = str(check_attendance_obj.employee) + " (" + str(check_attendance_obj.employee.employee_code) + ")"            
                                  get_obj = get_attendance_obj(name,check_attendance_obj.employee.id,check_attendance_obj.status.name,check_attendance_obj.id,date,check_attendance_obj.check_in,check_attendance_obj.check_out,check_attendance_obj.total_hours,check_attendance_obj.mark_lop)
                                  attendances_obj.append(get_obj)
               else:
                    users = HCMSUser.objects.filter(pk = employee).first()
                    check_attedance = Attendance.objects.filter(employee = users, date = start_date)
                    if check_attedance:
                        for check_attendance_obj in check_attedance:
                            date = check_attendance_obj.date
                            name = str(check_attendance_obj.employee) + " (" + str(check_attendance_obj.employee.employee_code) + ")"            
                            get_obj = get_attendance_obj(name,check_attendance_obj.employee.id,check_attendance_obj.status.name,check_attendance_obj.id,date,check_attendance_obj.check_in,check_attendance_obj.check_out,check_attendance_obj.total_hours,check_attendance_obj.mark_lop)
                            attendances_obj.append(get_obj)
                    else:
                        date = start_date
                        name = str(users) + " (" + str(users.employee_code) + ")"
                        get_obj = get_attendance_obj(name,users.id,status_obj.name,None,date,None,None,"00:00",None)
                        attendances_obj.append(get_obj)
    except Exception as e:
        logger.error('Unable to get attendance. Error: ' + str(e))
    return attendances_obj 
