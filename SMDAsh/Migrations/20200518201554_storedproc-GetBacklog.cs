using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class storedprocGetBacklog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

			var sp = @"CREATE PROCEDURE [dbo].[GetBacklogByCat]
				-- Add the parameters for the stored procedure here
				@Cat nvarchar(max) = null
				AS
				BEGIN

				select * into #backlogTemp from (
				select YearWeekIn,YearWeekOut,Category,SourceTool
				from Tickets
				where 1=0
				) as bt


				if lower(@Cat) in (N'All',N'all',N'ALL')
				begin
				insert into #backlogTemp 
				select YearWeekIn,YearWeekOut,Category,SourceTool
				from Tickets
				end
				else if lower(@Cat) = N'sr'
				begin
				insert into #backlogTemp 
				select YearWeekIn,YearWeekOut,SR as Category,SourceTool
				from Tickets
				where SR = @Cat
				end
				else
				begin
				insert into #backlogTemp 
				select YearWeekIn,YearWeekOut,Category,SourceTool
				from Tickets
				where Category = @Cat
				end;

				SELECT * into #backlog from(  select t1.SourceTool ,t1.YearWeekIn as 'YearWeek',t1.[In],ISNULL(t2.[Out], 0 ) as 'Out',0 AS backlog 

				FROM(
				SELECT Distinct YearWeekIn, SourceTool, count(YearWeekIn) as 'In'

				FROM   #backlogTemp
				group by YearWeekIn, SourceTool
				) as t1
				full outer join(
				SELECT Distinct YearWeekOut, count(YearWeekOut) as 'Out'

				FROM   #backlogTemp
				group by YearWeekOut
				) as t2
				on t1.YearWeekIn = t2.YearWeekOut
				where t1.YearWeekIn is Not null) as tb

				DECLARE Backlog_Cursor CURSOR FOR
				SELECT* from #backlog
				declare @st nvarchar(max), @yw nvarchar(max), @in int, @out int, @bnull int, @b int;
				OPEN Backlog_Cursor;
				FETCH NEXT FROM Backlog_Cursor Into @st, @yw, @in, @out, @bnull;
				set @b = @in - @out;
				update #Backlog set backlog = @b where YearWeek = @yw
				FETCH NEXT FROM Backlog_Cursor Into @st,@yw,@in,@out,@bnull;
				WHILE @@FETCH_STATUS = 0
				BEGIN
				set @b = @in - @out + @b;
				update #Backlog set backlog = @b where YearWeek = @yw
				FETCH NEXT FROM Backlog_Cursor Into @st,@yw,@in,@out,@bnull;
				END;

				CLOSE Backlog_Cursor;
				Deallocate Backlog_Cursor;

				select* from #backlog
				drop table #backlogTemp
				drop table #backlog

				END";

            migrationBuilder.Sql(sp);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
